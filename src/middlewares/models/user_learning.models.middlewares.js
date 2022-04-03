module.exports.UserLearningMiddleware = (schema) => {
  schema.virtual("skills", {
    ref: "SkillPoint",
    foreignField: "owner",
    localField: "_id",
    options: { sort: { create_at: -1 } },
  });

  schema.virtual("notes", {
    ref: "LearningNote",
    foreignField: "owner",
    localField: "_id",
    options: { sort: { create_at: -1 } },
  });

  schema.virtual("groups", {
    ref: "Group",
    foreignField: "members.member",
    localField: "_id",
    options: { sort: { create_at: -1 } },
  });

  schema.pre("find", function (next) {
    this.populate("skills").populate("groups", "name -host members.push_at").populate("notes");
    next();
  });
  schema.post("find", function (docs) {
    // show my classroom + join time
    if (docs.length < 1) return;
    let { _id, groups } = docs[0];
    if (!groups) return;
    groups = groups.map((group) => {
      if (!group) return;
      const groupString = JSON.stringify(group);
      let { members, classworks, lessons, ...g } = JSON.parse(groupString);
      if (!members) members = [];
      const me = members.filter((member) => `${member.member}` === `${_id}`);
      if (!me[0]) return g;
      const { push_at } = me[0];
      g.join_at = push_at;
      return g;
    });
    docs[0].groups = groups.sort((a, b) => (a.join_at > b.join_at ? -1 : 1));
    return docs;
  });
};
