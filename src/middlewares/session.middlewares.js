const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const MongoStore = require("connect-mongo");
const { JWT_COOKIE_EXPIRE_IN, KEY_SECRET_SESSION, NODE_ENV, DB_ATLAS } = require("../configs/app.configs");
const { RedisCache } = require("../utils/redis_cache.utils");

exports.session = (store) => {
  switch (store) {
    case "redis":
      store = new RedisStore({ client: RedisCache.client });
      break;
    case "mongodb":
      store = MongoStore.create({
        mongoUrl: DB_ATLAS,
      });
      break;
    default:
      break;
  }
  return session({
    store: store,
    secret: KEY_SECRET_SESSION,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    rolling: true,
    cookie: {
      secure: NODE_ENV === "production" ? true : false, // if true: only transmit cookie over https, in prod, always activate this
      httpOnly: true, // if true: prevents client side JS from reading the cookie
      maxAge: JWT_COOKIE_EXPIRE_IN, // session max age in milliseconds
      // explicitly set cookie to lax
      // to make sure that all cookies accept it
      // you should never use none anyway
      // sameSite: "lax",
      sameSite: "strict",
    },
  });
};
