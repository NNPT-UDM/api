const { AuthService } = require("../../api/services/auth.services");
const { sendError, sendSuccess, render, redirect, renderErrorPage } = require("../../base/router.base");

class AuthController {
  async pageLogin(req, res, next) {
    const { user } = req.session;
    if (user) {
      redirect({ response: res, path: `/page/${user.role}/home` });
    } else {
      render({
        response: res,
        title: "Login",
        view: "Auth/auth-login",
        layout: false,
        data: { message: req.flash("message"), error: req.flash("error") },
      });
    }
  }

  async pageLockScreen(req, res, next) {
    const { user } = req.session;
    if (user) {
      redirect({ response: res, path: `/page/${user.role}/home` });
    } else {
      render({
        response: res,
        title: "Lock Screen",
        view: "AuthInner/auth-lock-screen",
        layout: false,
      });
    }
  }

  async pageRegister(req, res, next) {
    const { user } = req.session;
    if (user) {
      redirect({ response: res, path: `/page/${user.role}/home` });
    } else {
      render({
        response: res,
        title: "Login",
        view: "Auth/auth-register",
        layout: false,
        data: { message: req.flash("message"), error: req.flash("error") },
      });
    }
  }

  async login(req, res, next) {
    const data = await AuthService.login(req, res);
    const { user } = req.session;
    if (data.success === 1 && user) {
      redirect({ response: res, path: `/page/${user.role}/home` });
    } else {
      redirect({ response: res, path: "/" });
    }
  }
  async logout(req, res, next) {
    const response = await AuthService.logout(req, res);
    if (response.success === 1 && !req.session) {
      redirect({ response: res, path: `/` });
    } else {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: 500,
      });
    }
  }
  async register(req, res, next) {
    const response = await AuthService.register(req, res);
    if (response.success === 1 && req.session) {
      redirect({ response: res, path: `/` });
    } else {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: 500,
      });
    }
  }

  async changePassword(req, res, next) {
    try {
      const data = await AuthService.changePassword(req, res);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const body = { body: req.body, request: req };
      const data = await AuthService.forgotPassword(body);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const data = await AuthService.resetPassword(req, res);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
}

module.exports = new AuthController();
