const { BaseApiControllers } = require("../../base/controllers.base");
const { sendSuccess, sendError } = require("../../base/router.base");
const { AttachmentServices } = require("../services/attachment.services");
const fs = require("fs");
class AttachmentApiControllers extends BaseApiControllers {
  constructor() {
    super(AttachmentServices);
  }
  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const info = await AttachmentServices.delete(id);
      const { path } = info;
      if (!path) sendSuccess(res, "Path is Null");
      fs.unlinkSync(require("path").resolve(path));
      sendSuccess(res, `Deleted ${path}`);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
}

module.exports = new AttachmentApiControllers();
