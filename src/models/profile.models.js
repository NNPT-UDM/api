const { objectId } = require("../utils/common.utils");
const { BaseModels } = require("../base/models.base");
const validator = require("validator");
const { ProfileMiddleware } = require("../middlewares/models/profile.models.middlewares");

const definition = {
  display_name: {
    type: String,
    default: "Undefined",
    required: [true, "Please tell us your name!"],
  },
  photo: { type: String, default: "" },
  DOB: { type: Date },
  gender: { type: String },
  bio: { type: String },
  contacts: {
    address: { type: String },
    phone: {
      type: String,
      match: /((^(\+\d{2}|\d{2}|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    social_network: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
};

class ProfileModel extends BaseModels {
  constructor() {
    super();
    this.name = "Profile";
    this.collection = "profiles";
    this.index = { display_name: "text" };
    this.init({ definition: definition });
    ProfileMiddleware(this.schema);
  }
}
module.exports.ProfileModel = new ProfileModel().export;
