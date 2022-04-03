const controller = require("../controllers/classwork_answer.api.controllers");
const C2TRouter = require("../../base/router.base");

class ClassworkAnswerApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "classwork_answer";
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
      permissions: [13, 0],
      middlewares: [
        this.middlewares.alias.getMe,
        this.middlewares.upload.array("s_subs"),
        this.middlewares.attachment.manyFileInfoStorage,
        this.middlewares.attachment.attachment,
        this.middlewares.alias.isAuthor,
      ],
    },
    {
      path: "/edit/:id",
      method: this.PUT,
      handler: controller.edit.bind(controller),
      permissions: [14, 0],
      middlewares: [
        this.middlewares.alias.getMe,
        this.middlewares.alias.setAuthor,
        this.middlewares.upload.array("s_subs"),
        this.middlewares.attachment.manyFileInfoStorage,
        this.middlewares.attachment.attachment,
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

module.exports = new ClassworkAnswerApiRoutes();
