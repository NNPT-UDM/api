module.exports.SkillMiddleware = (schema) => {
  schema.virtual("diagnostics", {
    ref: "Diagnostic",
    foreignField: "skill",
    localField: "_id",
  });
  schema.pre("find", function (next) {
    this.populate("diagnostics");
    next();
  });

  schema.post("find", function (docs) {
    docs = docs.map((doc) => {
      doc.diagnostics = doc.diagnostics.map((doc) => {
        const { id, skill, create_at, update_at, ...noA } = doc;
        return noA;
      });
      return doc;
    });
    return docs;
  });
};
