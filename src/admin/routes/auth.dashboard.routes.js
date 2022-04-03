const controller = require("../controllers/auth.dashboard.controllers");
const C2TRouter = require("../../base/router.base");

class AuthDashRoutes extends C2TRouter {
  constructor() {
    super();
  }

  path = "auth";
  routes = [
    {
      path: "/login",
      method: this.GET,
      handler: controller.pageLogin,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/lock-screen",
      method: this.GET,
      handler: controller.pageLockScreen,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/post-login",
      method: this.POST,
      handler: controller.login,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/register",
      method: this.GET,
      handler: controller.pageRegister,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/post-register",
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
      method: this.GET,
      handler: controller.logout,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/change-password",
      method: this.PUT,
      handler: controller.changePassword,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/forgot-password",
      method: this.POST,
      handler: controller.forgotPassword,
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

module.exports = new AuthDashRoutes();
