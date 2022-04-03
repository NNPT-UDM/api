const { BaseServices } = require("../../base/services.base");
const { objectId } = require("../../utils/common.utils");
const { ClassworkModel } = require("../../models/classwork.models");
const { ClassworkAnswerModel } = require("../../models/classwork_answer.models");
const { GroupModel } = require("../../models/group.models");
const { UserModel } = require("../../models/user.models");

class ClassworkServices extends BaseServices {
  constructor() {
    super(ClassworkModel);
  }

  async assigned(query) {
    const me = query._id;
    const classroomId = query.group;
    let classworks = await ClassworkModel.find({
      $or: [{ group: classroomId }, { assigned: query._id }],
    })
      .select("-group -assigned -author")
      .map(async (docs) => {
        return await Promise.all(
          docs.map(async (classwork) => {
            const docStr = JSON.stringify(classwork);
            let docParser = JSON.parse(docStr);
            const answers = await ClassworkAnswerModel.find({
              classwork: classwork._id,
              author: me,
            })
              .select("-classwork -author")
              .sort("-create_at");
            docParser.answer = answers[0] || {};
            return docParser;
          })
        );
      });
    return classworks;
  }
  async answerMissing(id) {}
  async answerMissingByGroup(id, classroomId) {
    let { members } = await GroupModel.findById(classroomId);
    const stats = await ClassworkModel.aggregate([
      {
        $match: { $and: [{ group: objectId(classroomId) }, { _id: objectId(id) }] },
      },
      {
        $lookup: {
          from: "classwork_answers",
          localField: "_id",
          foreignField: "classwork",
          as: "answers",
        },
      },
      {
        $project: {
          answers: 1,
          assigned: 1,
        },
      },
    ]);
    const { answers, assigned } = stats[0];
    const ansAuthor = answers.map((ans) => {
      return ans.author.toString();
    });
    const mem = await UserModel.find({ _id: { $in: assigned } });
    members = members.concat(mem).filter((el) => {
      return !ansAuthor.includes(el._id.toString());
    });
    return members;
  }
}

module.exports.ClassworkServices = new ClassworkServices();
