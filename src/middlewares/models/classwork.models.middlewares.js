module.exports.ClassworkMiddleware = (schema) => {
  schema.virtual("count_answers", {
    ref: "ClassworkAnswer",
    foreignField: "classwork",
    localField: "_id",
    count: true,
  });

  schema.virtual("answers", {
    ref: "ClassworkAnswer",
    foreignField: "classwork",
    localField: "_id",
  });

  schema.virtual("time_left").get(function () {
    const timeLeft = Math.abs(Date.now() - this.deadline);
    return {
      status: Date.now() > this.deadline ? 0 : 1,
      time: timeLeft,
    };
  });

  schema.pre(/^find/, function (next) {
    this.populate("author").populate("count_answers").populate({
      path: "attachments",
      select: "_id title filename path",
    });
    next();
  });

  schema.pre("findOne", function (next) {
    this.populate({
      path: "group",
      select: "name members -host",
      populate: { path: "members.member", model: "User" },
    }).populate("answers");
    next();
  });

  schema.post("findOne", function (doc) {
    if (doc.author) {
      const { profile, credential, settings, my_learning, permissions_expanded, flags, ...info } = doc.author;
      doc.author = {
        ...info,
        display_name: profile.display_name,
        photo: profile.photo,
        email: credential.email,
        phone: credential.phone,
      };
    }
    if (!doc.answers) return;
    doc.missing = [];
    doc.answers.forEach((answer) => {
      doc.answers = doc.group.map((group) => {
        let { members, classworks, lessons, ...g } = group;
        if (!members) members = [];
        let missing = { ...g, members: [] };
        g.members = [];
        Array.from(members).forEach((mem) => {
          let { member } = mem;
          const { profile, credential, settings, my_learning, ...info } = member;
          member = {
            ...info,
            display_name: profile.display_name,
            photo: profile.photo,
            email: credential.email,
            phone: credential.phone,
          };
          if (answer.author._id.toString() === mem.member._id.toString()) {
            let { classwork, author, corrections, ...ans } = answer;
            ans.author = {
              ...ans,
              display_name: author.profile.display_name,
              photo: author.profile.photo,
              email: author.credential.email,
              phone: author.credential.phone,
            };
            ans.corrections = corrections;
            g.members.push(ans);
          } else {
            missing.members.push(member);
          }
        });
        doc.missing.push(missing);
        return g;
      });
    });
    doc.group = doc.group.map((group) => {
      let { members, classworks, lessons, ...g } = group;
      return g;
    });
    return doc;
  });
};
