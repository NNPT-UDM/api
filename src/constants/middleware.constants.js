const { UploadMiddlewares } = require("../middlewares/upload.middlewares");
const { AuthMiddlewares } = require("../middlewares/authorize.middlewares");
const { AliasMiddlewares } = require("../middlewares/alias.middlewares");
const { AttachmentMiddlewares } = require("../middlewares/attachment.middlewares");
const { AccountMiddlewares } = require("../middlewares/account.middlewares");
const { QuizMiddlewares } = require("../middlewares/quiz.middlewares");

class MiddlewareConstants {
  upload = UploadMiddlewares;
  auth = AuthMiddlewares;
  alias = AliasMiddlewares;
  attachment = AttachmentMiddlewares;
  quiz = QuizMiddlewares;
  account = AccountMiddlewares;
}
module.exports = MiddlewareConstants;
