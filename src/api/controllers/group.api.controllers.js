const { BaseApiControllers } = require("../../base/controllers.base");
const { GroupServices } = require("../services/group.services");
const { sendSuccess, sendError } = require("../../base/router.base");
const { viewQuery } = require("../../utils/common.utils");

class GroupApiControllers extends BaseApiControllers {
  constructor() {
    super(GroupServices);
  }
  async view(req, res, next) {
    try {
      const { query, option } = viewQuery(req.query);
      const data = await GroupServices.view(query, option);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
  async addMembers(req, res, next) {
    try {
      const { members } = req.body;
      const data = await GroupServices.addMembers(req.params.id, members);
      sendSuccess(res, data);
    } catch (error) {
      sendError(res, error);
    }
  }
}

module.exports = new GroupApiControllers();
