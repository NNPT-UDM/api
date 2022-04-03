const {
  KEY_SECRET_JWT,
  JWT_EXPIRE_IN,
  JWT_COOKIE_EXPIRE_IN,
  NODE_ENV,
} = require("../../configs/app.configs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models/user.models");
const { CredentialModel } = require("../../models/credential.models");
const { AppError } = require("../../errors/app_error.errors");
const { Email } = require("../../utils/email.utils");
const { RoleModel } = require("../../models/role.models");
const { trimObj } = require("../../utils/common.utils");

class AuthService {
  async login(request, response) {
    try {
      const { phone, username, email, password } = request.body;
      let fields = [{ phone: phone }, { username: username }, { email: email }];
      fields = fields.filter((field) => {
        if (![undefined, null, ""].includes(Object.values(field)[0])) {
          return trimObj(field);
        }
      });
      // console.log(fields);
      const credential = await CredentialModel.findOne({
        $or: fields,
      }).select("+password");
      if (!credential) {
        return {
          success: 0,
          message: "No user found.",
        };
      }
      if (!credential.comparePassword(password)) {
        return {
          success: 0,
          message: "Wrong password.",
        };
      }
      return await this.jwtSign({
        req: request,
        res: response,
        credential: credential,
        message: "Auth successful",
      });
    } catch (error) {
      console.log(error);
      return {
        success: 0,
        message: "Auth failed",
      };
    }
  }

  async logout(request, response) {
    request.session.destroy();
    response.clearCookie("jwt_pie");
    return {
      success: 1,
      message: "Logout success",
    };
  }

  async register(request, response) {
    try {
      const body = request.body;
      try {
        let role = await RoleModel.findOne({
          $or: [{ slug: "guest" }, { name: "Guest" }],
        });
        if (!role) {
          role = await RoleModel.create({ name: "Guest" });
        }
        const user = await UserModel.create({
          ...body,
          role: role._id,
        });
        let credential = await CredentialModel.findOne({
          _id: user._id,
        });
        return await this.jwtSign({
          req: request,
          res: response,
          credential: credential,
          message: "Sign Up Success",
        });
      } catch (error) {
        console.log(error);
        return {
          success: 0,
          message: "Sign Up Failed",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: 0,
        message: "Create a new account failed.",
      };
    }
  }

  async changePassword(request, response) {
    try {
      const body = request.body;
      const user_id = request.user.id;
      // 1) Get user from collection
      const credential = await CredentialModel.findOne({
        _id: user_id,
      }).select("+password");
      // 2) Check if POSTed current password is correct
      if (!(await credential.comparePassword(body.password_current))) {
        return {
          success: 0,
          message: "Your current password is wrong.",
        };
      }
      if (body.password_current === body.password) {
        return {
          success: 0,
          message: "The new password cannot be the same as the old password.",
        };
      }
      // 3) If so, update password
      credential.password = body.password;
      credential.password_confirm = body.password_confirm;
      await credential.save();
      // UserModel.findByIdAndUpdate will NOT work as intended!

      // 4) Log user in, send JWT
      return await this.jwtSign({
        credential: credential,
        message: "Changed password successfully",
      });
    } catch (error) {
      console.log(error);
      return {
        success: 0,
        message: "Password change failed",
      };
    }
  }

  async resetPassword(request, response) {
    let { body, token } = { body: request.body, token: request.params.token };
    // 1) Get user based on the token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const credential = await CredentialModel.findOne({
      password_reset_token: hashedToken,
      password_reset_expires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!credential) {
      return {
        success: 0,
        message: "Token is invalid or has expired.",
      };
    }
    credential.password = body.password;
    credential.password_confirm = body.password_confirm;
    credential.password_reset_token = undefined;
    credential.password_reset_expires = undefined;
    await credential.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    return await this.jwtSign({
      res: response,
      req: request,
      credential: credential,
      message: "Password reset successfully",
    });
  }

  async checkResetToken(token) {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const credential = await CredentialModel.findOne({
      password_reset_token: hashedToken,
      password_reset_expires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!credential) {
      return {
        success: 0,
        message: "Token is invalid or has expired.",
      };
    }
    return {
      success: 1,
      message: "Token is valid",
    };
  }

  async forgotPassword(data) {
    const { body, request } = data;

    // 1) Get user based on POSTed email
    const credential = await CredentialModel.findOne({ email: body.email });
    if (!credential) {
      return {
        success: 0,
        message: "There is no user with email address.",
      };
    }

    // 2) Generate the random reset token
    const resetToken = credential.createPasswordResetToken();
    await credential.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    try {
      const resetURL = `${request.protocol}://${request.get("host")}/api/auth/reset-password/${resetToken}`;
      console.log(resetURL);
      const email = new Email(credential, resetURL);
      await email.sendPasswordReset();

      return {
        success: 1,
        message: "Token sent to email!",
      };
    } catch (err) {
      credential.password_reset_token = undefined;
      credential.password_reset_expires = undefined;
      await credential.save({ validateBeforeSave: false });
      console.log(err);
      return {
        success: 0,
        message: "There was an error sending the email. Try again later!",
      };
    }
  }

  async jwtSign({ req, res, credential, message } = {}) {
    const payload = {
      id: credential?.account?._id,
      username: credential?.username,
      role: credential?.account?.role?.slug,
      activated: credential?.account?.activated, // only for path
    };
    let token = jwt.sign(payload, KEY_SECRET_JWT, {
      expiresIn: JWT_EXPIRE_IN,
    });

    if (res) {
      let cookieOptions = {
        expires: new Date(Date.now() + JWT_COOKIE_EXPIRE_IN),
        httpOnly: true,
      };
      if (NODE_ENV === "production") cookieOptions.secure = true;
      res.cookie("jwt_pie", token, cookieOptions);
      // Assign value in session
      req.session.user = payload;
    }

    // record last access time
    await UserModel.updateOne({ _id: payload.id }, { last_access: Date.now() });

    return {
      success: 1,
      message: message,
      token: token,
    };
  }
}

module.exports.AuthService = new AuthService();
