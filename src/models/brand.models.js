const { BaseModels } = require("../base/models.base");
const { BrandMiddleware } = require("../middlewares/models/brand.models.middlewares");

const definition = {
  name: { type: String },
};

class BrandModel extends BaseModels {
  constructor() {
    super();
    this.name = "Brand";
    this.collection = "brands";
    this.index = { name: "text" };
    this.init({ definition: definition });
    BrandMiddleware(this.schema);
  }
}

module.exports.BrandModel = new BrandModel().export;
