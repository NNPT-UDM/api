const controller = require("../controllers/order.api.controllers");
const C2TRouter = require("../../base/router.base");

class OrderApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "order";
  routes = [
    {
      path: "/view",
      method: this.GET,
      handler: controller.view.bind(controller),
      permissions: [0],
      middlewares: [],
    },
    {
      path: "/add",
      method: this.POST,
      handler: controller.add.bind(controller),
      permissions: [0],
      middlewares: [],
    },
    {
      path: "/edit/:id",
      method: this.PUT,
      handler: controller.edit.bind(controller),
      permissions: [],
      middlewares: [],
    },
    {
      path: "/delete/:id",
      method: this.DELETE,
      handler: controller.delete.bind(controller),
      permissions: [],
      middlewares: [],
    },
  ];
}

module.exports = new OrderApiRoutes();
