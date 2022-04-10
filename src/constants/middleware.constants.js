const { UploadMiddlewares } = require("../middlewares/upload.middlewares");
const { AuthMiddlewares } = require("../middlewares/authorize.middlewares");
const { AliasMiddlewares } = require("../middlewares/alias.middlewares");
const { AttachmentMiddlewares } = require("../middlewares/attachment.middlewares");
const { AccountMiddlewares } = require("../middlewares/account.middlewares");

class MiddlewareConstants {
  upload = UploadMiddlewares;
  auth = AuthMiddlewares;
  alias = AliasMiddlewares;
  attachment = AttachmentMiddlewares;

  account = AccountMiddlewares;
}
module.exports = MiddlewareConstants;
