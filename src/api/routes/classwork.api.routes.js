const controller = require("../controllers/classwork.api.controllers");
const C2TRouter = require("../../base/router.base");

class ClassworkApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "classwork";
  routes = [
    {
      path: "/assigned",
      method: this.GET,
      handler: controller.assigned,
      permissions: [15, 0],
      middlewares: [this.middlewares.alias.getMe],
    },
    {
      path: "/:id/missing-answer-by-group/:group",
      method: this.GET,
      handler: controller.answerMissingByGroup,
      permissions: [15, 0],
      middlewares: [],
    },
    {
      path: "/:id/missing-answer",
      method: this.GET,
      handler: controller.answerMissing,
      permissions: [15, 0],
      middlewares: [],
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
      permissions: [11, 0],
      middlewares: [
        this.middlewares.alias.getMe,
        this.middlewares.upload.array("docs"),
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
        this.middlewares.upload.array("docs"),
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

module.exports = new ClassworkApiRoutes();
