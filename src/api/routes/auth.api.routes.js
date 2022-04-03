const controller = require("../controllers/auth.api.controllers");
const C2TRouter = require("../../base/router.base");

class AuthApiRoutes extends C2TRouter {
  constructor() {
    super();
  }

  path = "auth";
  routes = [
    {
      path: "/login",
      method: this.POST,
      handler: controller.login,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/register",
      method: this.POST,
      handler: controller.register,
      permissions: [],
      middlewares: [
        this.middlewares.upload.single("upload"),
        this.middlewares.account.checkAccountExists,
        this.middlewares.attachment.photoFromBase64,
        this.middlewares.account.setupAccount,
      ],
    },
    {
      path: "/logout",
      method: this.POST,
      handler: controller.logout,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/change-password",
      method: this.PUT,
      handler: controller.changePassword,
      permissions: [0],
      middlewares: [this.middlewares.alias.getMe],
    },
    {
      path: "/forgot-password",
      method: this.POST,
      handler: controller.forgotPassword,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/check-token/:token",
      method: this.GET,
      handler: controller.checkResetToken,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/reset-password/:token",
      method: this.PUT,
      handler: controller.resetPassword,
      permissions: [],
      middlewares: [],
    },
  ];
}

module.exports = new AuthApiRoutes();
