module.exports.LessonMiddleware = (schema) => {
  schema.virtual("reviews", {
    ref: "Review",
    foreignField: "lesson",
    localField: "_id",
  });
  schema.pre("find", function (next) {
    this.populate("reviews");
    next();
  });
  schema.pre("findOne", function (next) {
    this.populate({ path: "reviews", populate: { path: "owner", model: "User" } }).populate({
      path: "group",
      populate: {
        path: "members.member",
        model: "User",
      },
    });
    next();
  });
  schema.post("findOne", function (doc) {
    if (!doc.reviews) return doc;
    doc.reviews = Array.from(doc.reviews).map((review) => {
      const { lesson, owner, ..._review } = review;
      const { profile, credential, settings, permissions_expanded, flags, my_learning, role, ...userInfo } =
        owner;
      _review.owner = {
        ...userInfo,
        display_name: profile.display_name,
        photo: profile.display_name,
        email: credential.email,
        phone: credential.phone,
      };
      return _review;
    });
    if (!doc.group) return doc;
    const { members } = doc.group;
    doc.group = doc.group._id;
    doc.no_reviews_yet = members.map((mem) => {
      const {
        _id,
        profile,
        credential,
        settings,
        permissions_expanded,
        flags,
        my_learning,
        role,
        ...userInfo
      } = mem.member;
      mem = {
        ...userInfo,
        _id: _id,
        display_name: profile.display_name,
        photo: profile.display_name,
        email: credential.email,
        phone: credential.phone,
      };
      const reviewOwners = doc.reviews.map((review) => `${review.owner._id}`);
      if (!reviewOwners.includes(`${_id}`)) return mem;
      return null;
    });
    return doc;
  });

  schema.post("find", function (docs) {
    return docs.map((doc) => delete doc.reviews);
  });
};
