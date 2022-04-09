const dotenv = require("dotenv");
dotenv.config();
class Options {
  static ALL = "all";
  static NEW = "new";
  static TOP = "top";
  static POPULAR = "popular";
  static FILTER = "filter";
  static DETAIL = "detail";
  static SEARCH = "search";
  static OPEN = "open";
  static DOWNLOAD = "download";
  static DELETE = "delete";

  static IMAGE = "image";
  static VIDEO = "video";
}

module.exports = {
  // options
  Options: Options,

  PORT: parseInt(process.argv[2] || process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  DB_NAME: process.env.DB_NAME,
  DB_ATLAS: `mongodb+srv://xalo:xalo@dailoc.4pp7l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  DB_LOCAL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  KEY_SECRET_AES: process.env.KEY_SECRET_AES,
  KEY_SECRET_JWT: process.env.KEY_SECRET_JWT,
  KEY_SECRET_SESSION: process.env.KEY_SECRET_SESSION,
  JWT_EXPIRE_IN: 14 * 30 * 24 * 60 * 60,
  JWT_COOKIE_EXPIRE_IN: 14 * 24 * 60 * 60 * 1000,
  CACHE_EXPIRE: 1,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_HOST: process.env.REDIS_HOST,

  // drive
  DB_BACKUP_ID: process.env.DB_BACKUP_ID,

  // email credential
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_FROM: process.env.EMAIL_FROM,
  SENDGRID_USERNAME: process.env.SENDGRID_USERNAME,
  SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
};
