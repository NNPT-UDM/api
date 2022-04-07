const controller = require("../controllers/product.api.controllers");
const C2TRouter = require("../../base/router.base");

class ProductApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "product";
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
      permissions: [0],
      middlewares: [
        this.middlewares.alias.getMe,
        this.middlewares.upload.single("prod_photo"),
        this.middlewares.attachment.singleFileInfoStorage,
        this.middlewares.attachment.productPhoto,
      ],
    },
    {
      path: "/edit/:id",
      method: this.PUT,
      handler: controller.edit.bind(controller),
      permissions: [0],
      middlewares: [
        this.middlewares.alias.getMe,
        this.middlewares.upload.single("prod_photo"),
        this.middlewares.attachment.singleFileInfoStorage,
        this.middlewares.attachment.productPhoto,
      ],
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

module.exports = new ProductApiRoutes();
