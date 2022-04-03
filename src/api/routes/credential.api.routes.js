const controller = require("../controllers/credential.api.controllers");
const C2TRouter = require("../../base/router.base");

class CredentialApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "credential";
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
      path: "/edit-my-credential/:id",
      method: this.PUT,
      handler: controller.edit.bind(controller),
      permissions: [6],
      middlewares: [this.middlewares.alias.getMe, this.middlewares.alias.updateMyCredential],
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

module.exports = new CredentialApiRoutes();
