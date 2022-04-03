const { BaseApiControllers } = require("../../base/controllers.base");
const { sendSuccess, sendError } = require("../../base/router.base");
const { UserServices } = require("../services/user.services");

class UserController extends BaseApiControllers {
  constructor() {
    super(UserServices);
  }
  async importUserFromSheet(req, res, next) {
    const { file_info, classroom, role } = req.body;
    try {
      const data = await UserServices.importUserFromSheet(role, file_info, { classroom: classroom });
      sendSuccess(res, data);
    } catch (error) {
      sendError(res, error);
    }
  }
}

module.exports = new UserController();
