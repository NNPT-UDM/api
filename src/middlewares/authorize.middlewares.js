const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const qs = require("qs");
const { KEY_SECRET_JWT, JWT_EXPIRE_IN } = require("../configs/app.configs");
const { OperatorsUtils } = require("../utils/operators.utils");
const { PermissionsConstants } = require("../constants/permissions.constants");
const { RolesContants } = require("../constants/roles.constants");
const { UserModel } = require("../models/user.models");

class AuthMiddlewares {
  async authenticate(req, res, next) {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt_pie) {
      token = req.cookies.jwt_pie;
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in! Please log in to get access.",
      });
    }
    // 2) Verification token
    try {
      const decoded = jwt.verify(token, KEY_SECRET_JWT);
      // console.log("API user decoded", decoded);
      // 3) Check if user still exists
      const user = await UserModel.findOneAndUpdate(
        { _id: decoded.id },
        {
          last_access: Date.now(),
        },
        { new: true }
      ).populate("role");
      // console.log("API user", user);
      if (!user) {
        return res.status(401).json({
          success: 0,
          message: "The user belonging to this token does no longer exist.",
        });
      }
      // 4) Check if user changed password after the token was issued
      // if (user.changedPasswordAfter(decoded.iat)) {
      // 	return res.status(401).json({
      // 		success: 0,
      // 		message: "User recently changed password! Please log in again.",
      // 	});
      // }
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        success: 0,
        message: "Authorization failed",
      });
    }
  }

  verify(permissions) {
    try {
      // if (permissions.length <= 0) {
      //   return (req, res, next) =>
      //     res.status(401).json({
      //       success: 0,
      //       message: "Account Denied",
      //     });
      // }
      return [
        // authenticate
        this.authenticate,
        // authorize based on user role
        async (req, res, next) => {
          const user = req.user;

          const userPermissions = [...new Set([...user.role.permissions, ...user.permissions_expanded])];
          // data: _id, username, role, flags, status, permissions
          const permitted = OperatorsUtils.intersection(permissions, userPermissions);
          if (permitted?.length && user?.activated) {
            let query = PermissionsConstants.permission(user.role.range, permitted);
            query = [qs.stringify(req.query), query.join("&")].join("&");
            req.query = qs.parse(query);
            return next();
          } else {
            return res.status(401).json({
              success: 0,
              message: "Account Denied",
            });
          }
        },
      ];
    } catch (error) {
      console.log("ERROR", error);
      return res.status(403).json({
        success: 0,
        message: "Authorization failed",
      });
    }
  }

  async isLoggedIn(req, res, next) {
    try {
      const { cookie, user } = req.session;
      const { role } = req.params;
      if (user) {
        // record last access time
        const me = await UserModel.findOneAndUpdate(
          { _id: user.id },
          {
            last_access: Date.now(),
          },
          { new: true }
        ).populate("role");
        if (role !== me.role.slug && role) {
          user.role = me.role.slug;
          return next(createError(404, "Not Found!"));
        } else if (!me.activated) {
          return next(createError(403, "Account Disabled"));
        } else if ([RolesContants.Guest, RolesContants.Student].includes(me.role.slug)) {
          return next(createError(401, "Account Denied"));
        }
        // console.log("CLient", me);
        req.user = me;
        res.locals.user = me;
        next();
      } else {
        next(createError(403, "Authorization failed"));
      }
    } catch (error) {
      console.log(error);
      next(createError(403, "Forbidden"));
    }
  }
}
module.exports.AuthMiddlewares = new AuthMiddlewares();
