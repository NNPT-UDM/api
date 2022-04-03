const { BaseApiControllers } = require("../../base/controllers.base");
const { ColorServices } = require("../services/color.services");

class ColorApiControllers extends BaseApiControllers {
  constructor() {
    super(ColorServices);
  }
}

module.exports = new ColorApiControllers();
