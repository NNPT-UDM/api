const controller = require("../controllers/auth_quiz.api.controllers");
const C2TRouter = require("../../base/router.base");

class AuthApiRoutes extends C2TRouter {
  constructor() {
    super();
  }

  path = "auth_quiz";
  routes = [
    {
      path: "/register",
      method: this.POST,
      handler: controller.register,
      permissions: [],
      middlewares: [],
    },
  ];
}

module.exports = new AuthApiRoutes();
