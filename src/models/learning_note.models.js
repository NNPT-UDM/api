const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const definition = {
  owner: { type: objectId, ref: "User" },
  group: { type: objectId, ref: "Group" },
  content: { type: String },
};

class LearningNoteModel extends BaseModels {
  constructor() {
    super();
    this.name = "LearningNote";
    this.collection = "learning_notes";
    this.index = { owner: "text" };
    this.init({ definition: definition });
  }
}

module.exports.LearningNoteModel = new LearningNoteModel().export;
