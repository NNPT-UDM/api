const controller = require("../controllers/quiz_seg.api.controllers");
const C2TRouter = require("../../base/router.base");

class QuizSegApiRoutes extends C2TRouter {
  constructor() {
    super();
  }
  path = "quiz_seg";
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
      permissions: [0],
      middlewares: [
        this.middlewares.upload.array("docs"),
        this.middlewares.attachment.manyFileInfoStorage,
        this.middlewares.attachment.attachment,
      ],
    },
    {
      path: "/edit/:id",
      method: this.PUT,
      handler: controller.edit.bind(controller),
      permissions: [0],
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
      permissions: [0],
      middlewares: [],
    },
  ];
}

module.exports = new QuizSegApiRoutes();
