const { render } = require("../../base/router.base");

class ErrorController {
  async page404(req, res, next) {
    render({
      response: res,
      title: "404 Error | Admin",
      view: "Pages/pages-404",
      layout: false,
    });
  }
  async page500(req, res, next) {
    render({
      response: res,
      title: "500 Error | Admin",
      view: "Pages/pages-500",
      layout: false,
    });
  }
}

module.exports = new ErrorController();
