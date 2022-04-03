const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const points = {
  reading: { type: Number, default: 0 },
  listening: { type: Number, default: 0 },
  speaking: { type: Number, default: 0 },
  grammar: { type: Number, default: 0 },
  writing: { type: Number, default: 0 },
};

const definition = {
  author: { type: objectId, ref: "User" },
  owner: { type: objectId, ref: "User" },
  course: { type: objectId, ref: "Course" },
  group: { type: objectId, ref: "Group" },
  columns: {
    type: Array,
    default: function () {
      return Object.keys(points);
    },
  },
  stats: {
    mock_test: points,
    middle: points,
    final: points,
  },
  rubric: { type: String },
};

class SkillPointModel extends BaseModels {
  constructor() {
    super();
    this.name = "SkillPoint";
    this.collection = "skill_points";
    this.index = { student: "text" };
    this.init({ definition: definition });
  }
}

module.exports.SkillPointModel = new SkillPointModel().export;
