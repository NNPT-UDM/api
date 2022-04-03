const { BaseServices } = require("../../base/services.base");
const { LessonModel } = require("../../models/lesson.models");
const { ReviewModel } = require("../../models/review.models");

class ReviewServices extends BaseServices {
  constructor() {
    super(ReviewModel);
  }
  async myReviews(studentId, classroomId) {
    try {
      let lessons = await LessonModel.find({ group: classroomId })
        .lean({
          virtuals: true,
          defaults: true,
        })
        .select("-absentee_list");
      return Array.from(lessons).map((lesson) => {
        let { reviews } = lesson;
        if (!reviews) return [];
        lesson.reviews = Array.from(reviews).filter(
          (review) => studentId.toString() === review.owner.toString()
        );
        return lesson;
      });
    } catch (error) {
      console.log("View My Reviews 💥", error);
      return error;
    }
  }
}
module.exports.ReviewServices = new ReviewServices();
