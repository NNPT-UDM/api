const { BaseServices } = require("../../base/services.base");
const { ColorModel } = require("../../models/color.models");

class ColorServices extends BaseServices {
  constructor() {
    super(ColorModel);
  }
}
module.exports.ColorServices = new ColorServices();
