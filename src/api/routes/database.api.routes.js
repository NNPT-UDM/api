const controller = require("../controllers/database.api.controllers");
const C2TRouter = require("../../base/router.base");

class DatabaseApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "database";
  routes = [
    {
      path: "/generate/:collection",
      method: this.POST,
      handler: (req, res, next) => {},
      permissions: [],
      middlewares: [],
    },
    {
      path: "/:collection/import",
      method: this.GET,
      handler: controller.import,
      permissions: [],
      middlewares: [this.middlewares.upload.single],
    },
    {
      path: "/:collection/export",
      method: this.GET,
      handler: controller.export,
      permissions: [],
      middlewares: [],
    },
  ];
}

module.exports = new DatabaseApiRoutes();
