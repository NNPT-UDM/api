const validator = require("validator");
const { BaseModels } = require("../base/models.base");

const definition = {
  from: { type: String, required: true },
  js_scripts: { type: String },
  css_style: { type: String },
  html: { type: String },
  video: { type: String },
  link_ref: { type: String },
  provider: {
    name: { type: String },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
  },
  cost: { type: Number },
  ads_expires: { type: Date },
  status: { type: String },
};

class AdsModel extends BaseModels {
  constructor() {
    super();
    this.name = "Ads";
    this.collection = "ads";
    this.init({ definition: definition });
  }
}

module.exports.AdsModel = new AdsModel().export;
