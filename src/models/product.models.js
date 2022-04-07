const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const { ProductMiddleware } = require("../middlewares/models/product.models.middlewares");

const definition = {
  name: { type: String },
  photo: { type: objectId, ref: "Attachment" },
  videos: [{ type: String }],
  quality: { type: String },
  qty: { type: Number },
  price: {
    origin: { type: Number, default: 0.0 },
    sell: { type: Number, default: 0.0 },
    discount: { type: Number, default: 0.0 },
  },
  attrs: {
    sizes: [{ type: String }],
    colors: [{ type: String }],
  },
  description: { type: String },
  // list keyword related
  keywords: [{ type: objectId, ref: "Keyword" }],
  // list categories

  manufacturer: [{ name: { type: String }, context: { type: String } }],
  category: { type: objectId, ref: "Category" },
  brand: { type: objectId, ref: "Brand" },
};

class ProductModel extends BaseModels {
  constructor() {
    super();
    this.name = "Product";
    this.collection = "products";
    this.index = { name: "text", code: "text", brand: "text" };
    this.init({ definition: definition });
    this.setSlug("name");
    ProductMiddleware(this.schema);
  }
}

module.exports.ProductModel = new ProductModel().export;
