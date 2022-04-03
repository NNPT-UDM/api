const { BaseApiControllers } = require("../../base/controllers.base");
const { sendSuccess, sendError } = require("../../base/router.base");
const { ClassworkServices } = require("../services/classwork.services");

class ClassworkApiControllers extends BaseApiControllers {
  constructor() {
    super(ClassworkServices);
  }
  async assigned(req, res, next) {
    try {
      const query = req.query;
      const data = await ClassworkServices.assigned(query);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
  async answerMissing(req, res, next) {
    try {
      const { id, group } = req.params;
      const data = await ClassworkServices.answerMissing(id);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
  async answerMissingByGroup(req, res, next) {
    try {
      const { id, group } = req.params;
      const data = await ClassworkServices.answerMissingByGroup(id, group);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
}

module.exports = new ClassworkApiControllers();
