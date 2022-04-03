const controller = require("../controllers/classwork_mark.api.controllers");
const C2TRouter = require("../../base/router.base");

class ClassworkMarkApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "classwork_mark";
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
      permissions: [12],
      middlewares: [
        this.middlewares.alias.getMe,
        this.middlewares.upload.array("t_subs"),
        this.middlewares.attachment.manyFileInfoStorage,
        this.middlewares.attachment.attachment,
        this.middlewares.alias.isAuthor,
      ],
    },
    {
      path: "/edit/:id",
      method: this.PUT,
      handler: controller.edit.bind(controller),
      permissions: [12],
      middlewares: [
        this.middlewares.alias.getMe,
        this.middlewares.alias.setAuthor,
        this.middlewares.upload.array("t_subs"),
        this.middlewares.attachment.manyFileInfoStorage,
        this.middlewares.attachment.attachment,
      ],
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

module.exports = new ClassworkMarkApiRoutes();
