const { BaseModels } = require("../base/models.base");
const { objectId } = require("../utils/common.utils");

const definition = {
  skill: { type: objectId, ref: "Skill", required: true },
  type: { type: String },
};

class DiagnosticModel extends BaseModels {
  constructor() {
    super();
    this.name = "Diagnostic";
    this.collection = "diagnostics";
    this.init({ definition: definition });
  }
}

module.exports.DiagnosticModel = new DiagnosticModel().export;
