const { BaseModels } = require("../base/models.base");
const definition = {
  name: { type: String },
  code: { type: String },
};

class ColorModel extends BaseModels {
  constructor() {
    super();
    this.name = "Color";
    this.collection = "colors";
    this.init({ definition: definition });
  }
}
module.exports.ColorModel = new ColorModel().export;
