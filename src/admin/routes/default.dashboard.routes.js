const controller = require("../controllers/page.dashboard.controllers");
const C2TRouter = require("../../base/router.base");

class DefaultDashRoutes extends C2TRouter {
  constructor() {
    super();
  }

  path = "";
  routes = [
    {
      path: "/",
      method: this.GET,
      handler: controller.defaultPage,
      permissions: [],
      middlewares: [],
    },
  ];
}

module.exports = new DefaultDashRoutes();
