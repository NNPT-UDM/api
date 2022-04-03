const { BaseApiControllers } = require("../../base/controllers.base");
const { sendSuccess, sendError } = require("../../base/router.base");
const { selectFields } = require("../../utils/select_fields.utils");
const { validateQuery } = require("../../utils/url_parser.utils");
const { LogbookServices } = require("../services/logbook.services");

class LogbookApiControllers extends BaseApiControllers {
  constructor() {
    super(LogbookServices);
  }
  async editLog(req, res, next) {
    try {
      const id = req.params.id || undefined;
      const { lessons, notes } = req.body;
      let body = {
        "logs.$.lessons": lessons,
        "logs.$.notes": notes,
      };
      body = selectFields(body, req.query.fields);
      const data = await LogbookServices.edit({ "logs._id": id }, body);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
}

module.exports = new LogbookApiControllers();
