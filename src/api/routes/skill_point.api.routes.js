const controller = require("../controllers/skill_point.api.controllers");
const C2TRouter = require("../../base/router.base");

class SkillPointApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "skill_point";
  routes = [
    {
      path: "/me",
      method: this.GET,
      handler: controller.view.bind(controller),
      permissions: [0],
      middlewares: [this.middlewares.alias.getMe, this.middlewares.alias.setOwner],
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
      middlewares: [this.middlewares.alias.isAuthor],
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

module.exports = new SkillPointApiRoutes();
