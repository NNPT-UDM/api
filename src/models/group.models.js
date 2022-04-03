const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { ClassRoomMiddleware } = require("../middlewares/models/group.models.middlewares");

const definition = {
  name: { type: String, required: true, unique: true },
  photo: { type: String },
  course: { type: objectId, ref: "Course" },
  host: { type: objectId, ref: "User" },
  members: [
    {
      _id: false,
      member: { type: objectId, ref: "User" },
      push_at: { type: Date, default: Date.now },
    },
  ],
  qty: {
    type: Number,
    defaut: function () {
      return this.members.length || 0;
    },
  },
  max_qty: { type: Number },
  description: { type: String },
  is_online: { type: Boolean, default: false },
  activated: { type: Boolean, default: false },
};

class GroupModel extends BaseModels {
  constructor() {
    super();
    this.name = "Group";
    this.collection = "groups";
    this.index = { name: "text", host: "text" };
    this.init({ definition: definition });
    this.setSlug("name");
    ClassRoomMiddleware(this.schema);
  }
}

module.exports.GroupModel = new GroupModel().export;
