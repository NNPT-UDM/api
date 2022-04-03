const { Router } = require("express");
const MiddlewareConstants = require("../constants/middleware.constants");
// HTTP methods
class Methods {
  GET = "GET";
  POST = "POST";
  PUT = "PUT";
  PATCH = "PATCH";
  DELETE = "DELETE";
}

class IRoute {
  path = String;
  method = Methods;
  handler = (request, response, next) => {};
  permissions = [Number];
  middlewares = [(request, response, next) => {}];
}

class C2TRouter extends Methods {
  constructor() {
    super();
    this.router = Router({ mergeParams: true });
    this.middlewares = new MiddlewareConstants();
  }

  path = String;
  routes = [IRoute];

  setRoute(app) {
    // Set HTTP method, middleware, and handler for each route
    // Returns Router object, which we will use in Server class
    for (const route of this.routes) {
      if (app === "api") {
        const regExpress =
          /\b(login|register|forgot-password|check-token|reset-password|logout|(product|skill)+[/]+(view))\b/g;
        if (!regExpress.test(`${this.path}/${route.path}`)) {
          this.router.use(route.path, this.middlewares.auth.verify(route.permissions));
        }
      } else if (app === "dash") {
        if (!["auth", "error"].includes(this.path)) {
          this.router.use(route.path, this.middlewares.auth.isLoggedIn);
        }
      }
      // ===============================================
      for (const mw of route.middlewares) {
        this.router.use(route.path, mw);
      }
      switch (route.method) {
        case "GET":
          this.router.get(route.path, route.handler);
          break;
        case "POST":
          this.router.post(route.path, route.handler);
          break;
        case "PUT":
          this.router.put(route.path, route.handler);
          break;
        case "PATCH":
          this.router.patch(route.path, route.handler);
          break;
        case "DELETE":
          this.router.delete(route.path, route.handler);
          break;
        default:
        // Throw exception
      }
    }
    // Return router instance (will be usable in Server class)
    return this.router;
  }

  static sendSuccess(response, data, message) {
    return response.status(200).json({
      message: message || "success",
      success: 1,
      data: data,
    });
  }

  static sendError(response, message) {
    return response.status(500).json({
      message: message || "internal server error",
      success: 0,
    });
  }

  static render({ response, title, view, layout, data } = {}) {
    data = { ...data, title: title, layout: layout };
    return response.render(view, data);
  }

  static renderErrorPage({ response, title = "Not Found!", message = null, statusCode = 404 } = {}) {
    if (![404, 500].includes(statusCode)) statusCode = 500;
    return response.status(statusCode).render(`Pages/pages-${statusCode}`, {
      title: title,
      msg: message,
      layout: false,
    });
  }

  static redirect({ response, path } = {}) {
    return response.redirect(`${response.locals.root}${path}`);
  }
}

module.exports = C2TRouter;
