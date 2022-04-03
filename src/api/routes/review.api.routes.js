const controller = require("../controllers/review.api.controllers");
const C2TRouter = require("../../base/router.base");

class RoleApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "review";
  routes = [
    {
      path: "/me/:classroomId",
      method: this.GET,
      handler: controller.myReviews,
      permissions: [0],
      middlewares: [this.middlewares.alias.getMe],
    },
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

module.exports = new RoleApiRoutes();
