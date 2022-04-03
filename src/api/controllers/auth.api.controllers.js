const { sendSuccess, sendError } = require("../../base/router.base");
const { AuthService } = require("../services/auth.services");

class AuthController {
  async login(req, res, next) {
    try {
      const data = await AuthService.login(req, res);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
  async logout(req, res, next) {
    try {
      const data = await AuthService.logout(req, res);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
  async register(req, res, next) {
    try {
      const data = await AuthService.register(req, res);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
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

  async checkResetToken(req, res, next) {
    try {
      const data = await AuthService.checkResetToken(req.params.token);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
}

module.exports = new AuthController();
