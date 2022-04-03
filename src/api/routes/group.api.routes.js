const controller = require("../controllers/group.api.controllers");
const C2TRouter = require("../../base/router.base");

class GroupApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "group";
  routes = [
    {
      path: "/view",
      method: this.GET,
      handler: controller.view,
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
      path: "/add-members/:id",
      method: this.PUT,
      handler: controller.addMembers,
      permissions: [0],
      middlewares: [],
    },
    {
      path: "/edit/:id",
      method: this.PUT,
      handler: controller.edit.bind(controller),
      permissions: [0],
      middlewares: [],
    },
    {
      path: "/activate/:id",
      method: this.PUT,
      handler: controller.activate.bind(controller),
      permissions: [0],
      middlewares: [],
    },
    {
      path: "/disable/:id",
      method: this.PUT,
      handler: controller.disable.bind(controller),
      permissions: [0],
      middlewares: [],
    },
    {
      path: "/delete/:id",
      method: this.DELETE,
      handler: controller.delete.bind(controller),
      permissions: [0],
      middlewares: [],
    },
  ];
}

module.exports = new GroupApiRoutes();
