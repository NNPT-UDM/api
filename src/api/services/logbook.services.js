const { BaseServices } = require("../../base/services.base");
const { LogbookModel } = require("../../models/logbook.models");

class LogbookServices extends BaseServices {
  constructor() {
    super(LogbookModel);
  }
}
module.exports.LogbookServices = new LogbookServices();
