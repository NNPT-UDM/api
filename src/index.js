const logger = require("morgan");
const rid = require("connect-rid");
const compression = require("compression");
const { urlencoded, json, raw, text } = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const i18n = require("i18n-express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const flash = require("connect-flash");
const xss = require("xss-clean");
const hpp = require("hpp");
const { PORT, NODE_ENV } = require("./configs/app.configs");
const Server = require("./server");
const express = require("express");
const { session } = require("./middlewares/session.middlewares");
const app = express();
const server = new Server(app, PORT);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
}
app.get("/ip", (req, res, next) => req.send(req.ip));
app.get("/hello_world", (req, res, next) => {
  res.send("Hello World");
});

const globalMiddleware = [
  // Security HTTP headers
  helmet(),
  // Development logging
  logger(NODE_ENV === "development" ? "dev" : "tiny"), // common, dev,
  // Body parser, reading data from body
  urlencoded({ extended: true, limit: "2mb" }),
  json({ limit: "2mb" }),
  // Data sanitization against NoSQL query injection
  mongoSanitize(),
  // Data sanitization against XSS
  xss(),
  // Prevent parameter pollution
  hpp({
    whitelist: ["sort", "expands"],
  }),
  // Cookie parser
  cookieParser(),
  session("mongodb"),
  flash(),
  //language
  i18n({
    translationsPath: path.join(__dirname, "admin/i18n"), // <--- use here. Specify translations files path.
    siteLangs: ["es", "en", "de", "ru", "it", "fr"],
    textsVarName: "translation",
  }),
  rid(),
  // compress all responses
  compression(),
  // Serving static files
  express.static(path.resolve("uploads")),
  express.static(path.join(__dirname, "admin/public")),
];

Promise.resolve()
  .then(() => {
    // server.dbBackup();
    server.initDatabase();
  })
  .then(() => {
    // load middleware
    server.loadGlobalMiddleware(globalMiddleware);
    // view engine setup
    server.viewEngineSetup();
    // load routes
    server.loadAPIRoutes();
    server.loadDashboardRoutes();
    // catch and handler errors
    server.errorHandler();
    // run server
    server.run();
  });

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message, err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
