const { BaseApiControllers } = require("../../base/controllers.base");
const { sendSuccess, sendError } = require("../../base/router.base");
const { ReviewServices } = require("../services/review.services");

class ReviewApiControllers extends BaseApiControllers {
  constructor() {
    super(ReviewServices);
  }
  async myReviews(req, res, next) {
    try {
      const { classroomId } = req.params;
      const { _id } = req.query;
      const data = await ReviewServices.myReviews(_id, classroomId);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
}

module.exports = new ReviewApiControllers();
