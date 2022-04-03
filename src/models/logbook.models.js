const validator = require("validator");
const { boolean } = require("yargs");
const { BaseModels } = require("../base/models.base");
const { LogbookMiddleware } = require("../middlewares/models/logbook.models.middlewares");
const { objectId } = require("../utils/common.utils");

const definition = {
  group: { type: objectId, ref: "Group", unique: true },
  logs: [
    {
      diagnostic: { type: objectId, ref: "Diagnostic" },
      lessons: [{ type: String }], // id checkbox
      notes: { type: String },
      activated: { type: Boolean, default: true },
    },
  ],
};

class LogbookModel extends BaseModels {
  constructor() {
    super();
    this.name = "Logbook";
    this.collection = "logbooks";
    this.init({ definition: definition });
    LogbookMiddleware(this.schema);
  }
}

module.exports.LogbookModel = new LogbookModel().export;
