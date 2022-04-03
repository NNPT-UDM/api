const controller = require("../controllers/user.api.controllers");
const C2TRouter = require("../../base/router.base");

class UserApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "user";
  routes = [
    {
      path: "/me",
      method: this.GET,
      handler: controller.view.bind(controller),
      permissions: [6],
      middlewares: [this.middlewares.alias.getMe],
    },
    {
      path: "/view",
      method: this.GET,
      handler: controller.view.bind(controller),
      permissions: [0],
      middlewares: [this.middlewares.alias.getUser],
    },
    {
      path: "/add",
      method: this.POST,
      handler: controller.add.bind(controller),
      permissions: [0],
      middlewares: [
        this.middlewares.account.checkAccountExists,
        this.middlewares.attachment.photoFromBase64,
        this.middlewares.account.setupAccount,
      ],
    },
    {
      path: "/import",
      method: this.POST,
      handler: controller.importUserFromSheet,
      permissions: [0],
      middlewares: [
        this.middlewares.upload.single("import"),
        this.middlewares.attachment.singleFileInfoStorage,
        this.middlewares.attachment.imported,
      ],
    },
    {
      path: "/edit/:id",
      method: this.PUT,
      handler: controller.edit.bind(controller),
      permissions: [0],
      middlewares: [
        this.middlewares.alias.updateUser,
        this.middlewares.attachment.photoFromBase64,
        this.middlewares.account.setupAccount,
      ],
    },
    {
      path: "/edit-me",
      method: this.PUT,
      handler: controller.edit.bind(controller),
      permissions: [6],
      middlewares: [
        this.middlewares.alias.getMe,
        this.middlewares.alias.updateMe,
        this.middlewares.attachment.photoFromBase64,
        this.middlewares.account.setupAccount,
      ],
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
      path: "/disable-me",
      method: this.PUT,
      handler: controller.disable.bind(controller),
      permissions: [6, 0],
      middlewares: [this.middlewares.alias.getMe],
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

module.exports = new UserApiRoutes();
