const { AttachmentModel } = require("../../models/attachment.models");
const { objectId } = require("../../utils/common.utils");

module.exports.ClassworkAnswerMiddleware = (schema) => {
  schema.virtual("corrections", {
    ref: "ClassworkMark",
    foreignField: "classwork_answer",
    localField: "_id",
    options: { sort: { update_at: -1 } },
    justOne: true,
  });

  schema.pre(/^findOne/, function (next) {
    this.populate("corrections")
      .populate({
        path: "attachments",
        select: "_id title filename path size",
      })
      .populate({
        path: "classwork",
        select: "deadline time_left -author -attachments",
      });
    next();
  });

  schema.pre("find", function (next) {
    this.populate("author", "profile").populate("corrections").populate({
      path: "attachments",
      select: "_id title filename path size",
    });
    next();
  });

  schema.post("save", async function (doc) {
    let files = doc.attachments;
    let attachments = await Promise.all(
      Array.from(files).map(async (file) => {
        const f = await AttachmentModel.findById(file);
        return f;
      })
    );
    doc.attachments = attachments;
    return doc;
  });

  schema.statics.setStatus = async function (doc) {
    let classworkId;
    if (objectId.isValid(doc.classwork)) {
      classworkId = doc.classwork;
    } else {
      classworkId = doc.classwork._id;
    }
    const dataUpdate = await this.aggregate([
      { $match: { classwork: classworkId } },
      {
        $lookup: {
          from: "classworks",
          localField: "classwork",
          foreignField: "_id",
          as: "classwork",
        },
      },
      {
        $project: {
          _id: 0,
          is_modified: { $lt: ["$create_at", "$update_at"] },
          status: {
            $cond: {
              if: {
                $lt: ["$update_at", { $arrayElemAt: ["$classwork.deadline", 0] }],
              },
              then: "early",
              else: "late",
            },
          },
        },
      },
      { $limit: 1 },
    ]);

    console.log(dataUpdate);
    if (dataUpdate.length > 0) {
      await this.updateOne({ _id: doc._id }, dataUpdate[0]);
    }
  };

  schema.post("save", function (doc) {
    // console.log("Save", this);
    this.constructor.setStatus(doc);
  });

  schema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    // console.log("findOneAnd", this.r);
    next();
  });

  schema.post(/^findOneAnd/, async function (doc, next) {
    await this.r.constructor.setStatus(doc);
    next();
  });
};
