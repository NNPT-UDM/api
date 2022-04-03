const controller = require("../controllers/error.dashboard.controllers");
const C2TRouter = require("../../base/router.base");

class ErrorDashRoutes extends C2TRouter {
  constructor() {
    super();
  }

  path = "error";
  routes = [
    {
      path: "/404",
      method: this.GET,
      handler: controller.page404,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/500",
      method: this.GET,
      handler: controller.page500,
      permissions: [],
      middlewares: [],
    },
  ];
}

module.exports = new ErrorDashRoutes();
