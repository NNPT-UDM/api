const { RolesContants } = require("../constants/roles.constants");
const { CredentialModel } = require("../models/credential.models");
const { ProfileModel } = require("../models/profile.models");
const { RoleModel } = require("../models/role.models");
const { SettingModel } = require("../models/setting.models");
const { UserModel } = require("../models/user.models");

const { trimObj, objectId } = require("../utils/common.utils");
const { selectFields } = require("../utils/select_fields.utils");

class AccountMiddlewares {
  async checkAccountExists(req, res, next) {
    try {
      const { phone, username, email } = req.body;
      let fields = [{ phone: phone }, { username: username }, { email: email }];
      fields = fields.filter((field) => {
        if (![undefined, null, ""].includes(Object.values(field)[0])) {
          return trimObj(field);
        }
      });
      const credential = await CredentialModel.findOne({
        $or: fields,
      });

      if (credential) {
        return res.status(400).json({
          success: 0,
          message: "Login already exists, please enter other information",
        });
      }
      next();
    } catch (error) {
      console.error(`${__filename} 💥`, error);
      return res.status(500).json({
        success: 0,
        message: "Something went wrong!",
      });
    }
  }

  async setupAccount(req, res, next) {
    try {
      const body = selectFields(req.body, req.query.fields || null);
      const method = req.method;

      switch (method) {
        case "POST":
          {
            body._id = objectId();
            await CredentialModel.create(body);
            await ProfileModel.create(body);
            await SettingModel.create(body);
          }
          break;
        case "PUT":
          {
            const id = req.query._id || req.params.id || undefined;
            const { profile, settings, credential } = await UserModel.findById(id).populate(
              "profile",
              "settings",
              "credential"
            );
            // console.log("Body", body);
            await CredentialModel.findOneAndUpdate({ _id: credential._id }, body);
            await ProfileModel.findOneAndUpdate({ _id: profile._id }, body);
            // if (req.query.fields.includes("settings")) {
            //   await SettingModel.findOneAndUpdate({ _id: settings._id }, body);
            // }
          }
          break;
        default:
          break;
      }
      // add role to input[hidden]
      if (body.role) {
        const { name, slug } = await RoleModel.findById(body.role);
        if (slug === RolesContants.Student) await setLearningSpace(body);
      }
      req.body = body;
      return next();
    } catch (error) {
      console.error(`${__filename} 💥`, error);
      return res.status(500).json({
        success: 0,
        message: `Something went wrong!`,
      });
    }
  }
}
module.exports.AccountMiddlewares = new AccountMiddlewares();
