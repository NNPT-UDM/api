const controller = require("../controllers/role.api.controllers");
const C2TRouter = require("../../base/router.base");

class RoleApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "role";
  routes = [
    {
      path: "/view",
      method: this.GET,
      handler: controller.view.bind(controller),
      permissions: [9],
      middlewares: [],
    },
    {
      path: "/add",
      method: this.POST,
      handler: controller.add.bind(controller),
      permissions: [],
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

module.exports = new RoleApiRoutes();
