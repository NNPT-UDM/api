module.exports.QuizMiddleware = (schema) => {
  schema.pre(/^findOne/, function (next) {
    this.populate("skill", "slug").populate("author", "profile");
    next();
  });

  schema.virtual("score_per_question").get(function () {
    return this.max_scores / this.qty;
  });

  schema.pre(/^find/, function (next) {
    this.populate("author", "profile");
    next();
  });

  schema.post(/^find/, function (docs) {
    if (!Array.isArray(docs)) docs = [docs];
    docs = Array.from(docs).map((doc) => {
      const { author } = doc;
      const { profile, credential, settings, permissions_expanded, flags, my_learning, role, ...userInfo } =
        author;
      doc.author = {
        ...userInfo,
        display_name: profile.display_name,
        photo: profile.display_name,
        email: credential.email,
        phone: credential.phone,
      };
      return doc;
    });
    return docs;
  });

  schema.pre(/(save|[U|u]pdate)/g, function (next) {
    try {
      const data = this.getUpdate();
      if (!data.$set) next();
      if (data.$set.duration) data.$set.duration *= 60;
    } catch (error) {
      this.duration *= 60;
    }
    next();
  });
};
