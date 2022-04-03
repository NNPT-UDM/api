const controller = require("../controllers/country.api.controllers");
const C2TRouter = require("../../base/router.base");

class CountryApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "country";
  routes = [
    {
      path: "/view",
      method: this.GET,
      handler: controller.view.bind(controller),
      permissions: [],
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

module.exports = new CountryApiRoutes();
