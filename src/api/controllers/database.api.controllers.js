const { sendSuccess, sendError } = require("../../base/router.base");
const { DBServices } = require("../services/database.services");

class DatabaseApiControllers {
  async import(req, res, next) {
    try {
      const file = req.file;
      const { collection, type } = req.params;
      const data = await DBServices.mongooseImport(collection, file, type);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
  async export(req, res, next) {
    try {
      const { collection } = req.params;
      const data = await DBServices.mongooseExport(collection);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
}

module.exports = new DatabaseApiControllers();
