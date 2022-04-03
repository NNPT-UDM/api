module.exports.ClassRoomMiddleware = (schema) => {
  schema.virtual("classworks", {
    ref: "Classwork",
    foreignField: "group",
    localField: "_id",
  });

  schema.virtual("lessons", {
    ref: "Lesson",
    foreignField: "group",
    localField: "_id",
  });

  schema.virtual("logbook", {
    ref: "Logbook",
    foreignField: "group",
    localField: "_id",
    justOne: true,
  });
  schema.pre(/^find/, function (next) {
    this.populate("host");
    next();
  });

  schema.pre(/^findOne/, function (next) {
    this.populate("lessons")
      .populate("logbook")
      .populate("classworks", "-author -group deadline attachments title description")
      .populate("course", "-create_at -update_at -slug")
      .populate("members.member", "-role -flags -settings -permissions_expanded");
    next();
  });

  // schema.post("find", function (docs) {
  //   docs = Array.from(docs).map((doc) => {
  //     const { classworks, lessons, members, host, ...result } = doc;
  //     return result;
  //   });
  //   return docs;
  // });

  schema.statics.qty_members = async function (id) {
    const stats = await this.aggregate([
      {
        $match: { _id: id },
      },
      {
        $project: {
          qty: {
            $cond: {
              if: { $isArray: "$members" },
              then: { $size: "$members" },
              else: 0,
            },
          },
        },
      },
    ]);
    if (stats.length > 0) {
      await this.updateOne({ _id: id }, { qty: stats[0].qty }, { new: true });
    } else {
      await this.updateOne({ _id: id }, { qty: 0 }, { new: true });
    }
  };

  schema.post("save", function () {
    this.constructor.qty_members(this._id);
  });

  schema.pre(/^findOneAnd(Update|Delete)/, async function (next) {
    this.r = await this.findOne();
    // console.log(this.r);
    next();
  });

  schema.post(/^findOneAnd(Update|Delete)/, async function (doc, next) {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.qty_members(this.r._id);
    next();
  });
};
