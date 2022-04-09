const fs = require("fs");
const http = require("http");
const path = require("path");
const ejs = require("ejs"),
  LRU = require("lru-cache");
// let myFileLoader = function (filePath) {
//   return "myFileLoader: " + fs.readFileSync(filePath);
// };
const assert = require("assert");
const mongoose = require("mongoose");
const { DB_ATLAS, DB_LOCAL, NODE_ENV } = require("./configs/app.configs");
const cors = require("cors");
const G_Routes = require(`./utils/routes.utils`);
const rateLimited = require("express-rate-limit");
const expressLayout = require("express-ejs-layouts");
const { globalErrorHandler } = require("./middlewares/error_handler.middlewares");
const limitRate = 1000;
const limitMinutes = 5;
const limiter = rateLimited({
  max: limitRate,
  windowMs: limitMinutes * 60 * 1000,
  message: `Too many requests from this IP, please try again in ${limitMinutes} minutes`,
});

const whitelist = [];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  console.log(req.header("Origin"));
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: true,
      methods: "GET, POST, PUT, DELETE",
    }; // reflect (enable) the requested origin in the CORS response
    callback(null, corsOptions); // callback expects two parameters: error and options
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
    callback("Not allowed by CORS", corsOptions);
  }
};

class Server {
  constructor(app, port) {
    this.app = app;
    this.port = port;
  }

  initDatabase() {
    // connect to database
    mongoose.connect(
      NODE_ENV === "development"
        ? DB_LOCAL
        : DB_LOCAL.replace("localhost", "db"),
      // DB_ATLAS,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        assert.equal(null, err);
        console.log(`connected To Database with Uri: ${DB_LOCAL}`);
      }
    );
  }

  // dbBackup() {
  // 	DBServices.mongooseBackup();
  // }

  // load api routes
  loadAPIRoutes() {
    const root = `/api`;
    const routes = G_Routes.api;
    Array.from(routes).forEach((route) => {
      this.app.use(
        `${root}/${route.path}`,
        cors(),
        // cors(corsOptionsDelegate),
        // cors({
        // 	credentials: true,
        // 	origin: true,
        // }),
        limiter,
        route.setRoute("api")
      );
    });
  }

  // load dashboard routes
  loadDashboardRoutes() {
    const root = `/dashboard`;
    const routes = G_Routes.dashboard;
    this.app.get("/", (req, res, next) => {
      res.redirect(root);
    });
    Array.from(routes).forEach((route) => {
      this.app.use(
        `${root}/${route.path}`,
        (req, res, next) => {
          res.locals = {
            api: `/api`,
            base: req.baseUrl,
            root: root,
          };
          console.log(res.locals);
          next();
        },
        route.setRoute("dash")
      );
    });
  }

  loadGlobalMiddleware(middleware) {
    Array.from(middleware).forEach((mv) => {
      this.app.use(mv);
    });
  }

  viewEngineSetup() {
    ejs.cache = new LRU(100);
    // ejs.fileLoader = myFileLoader;
    // view engine setup
    this.app.set("views", path.join(__dirname, `admin/views`));

    this.app.set("view engine", "ejs");
    this.app.set("view cache", true);

    this.app.use(expressLayout);
    this.app.set("layout", "Layouts/layout");
  }

  errorHandler() {
    // catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      res.status(404).send("Not Found");
    });
    this.app.use(globalErrorHandler);
  }
  run() {
    const server = http.createServer(this.app);
    return server.listen(this.port, () => {
      console.log("Server start on: ", this.port);
    });
  }
}

module.exports = Server;
