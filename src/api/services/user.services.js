const XLSX = require("xlsx");
const { BaseServices } = require("../../base/services.base");
const { CredentialModel } = require("../../models/credential.models");
const { generateString } = require("../../utils/random_string.utils");
const { objectId } = require("../../utils/common.utils");
const { ProfileModel } = require("../../models/profile.models");
const { SettingModel } = require("../../models/setting.models");
const { RolesContants } = require("../../constants/roles.constants");
const { UserLearningModel } = require("../../models/user_learning.models");
const { RoleModel } = require("../../models/role.models");
const { UserModel } = require("../../models/user.models");
const { GroupModel } = require("../../models/group.models");
class UserServices extends BaseServices {
  constructor() {
    super(UserModel);
  }
  async importUserFromSheet(roleId, fileInfo, { classroom } = {}) {
    if (!roleId) return "Role Id not found!";
    const { path } = fileInfo;
    let workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const first_worksheet = workbook.Sheets[sheetName];
    const originHeader = ["Tên học viên", "Sdt", "Email", "Facebook", "Instagram", "Password"];
    const header = [
      "display_name",
      "phone",
      "email",
      "contacts.social_network.facebook",
      "contacts.social_network.instagram",
    ];
    let data = XLSX.utils.sheet_to_json(first_worksheet, { header: header, defval: null });
    let newData = [originHeader];
    let members = []; // if any
    delete data[0];
    data = data.map((obj) => {
      let { email } = obj;
      obj._id = objectId();
      obj.username = email.split("@")[0];
      obj.password = generateString(10);
      obj.password_confirm = obj.password;
      obj.activated = true;
      obj.role = roleId;
      let { role, password_confirm, _id, username, ...newRowData } = obj;
      newData.push(Object.values(newRowData));
      members.push(obj._id);
      return obj;
    });
    const credential = await CredentialModel.create(data);
    if (credential) {
      await ProfileModel.create(data);
      await SettingModel.create(data);
      const { name, slug } = await RoleModel.findById(roleId);
      if (slug === RolesContants.Student) await UserLearningModel.create(data);
      await UserModel.create(data);
      if (classroom) {
        await GroupModel.updateOne(
          { _id: classroom },
          { $addToSet: { members: members }, update_at: Date.now() }
        );
      }
    }
    // Overwrite worksheet
    workbook.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(newData);
    XLSX.writeFile(workbook, path);
    return roleId;
  }
}

module.exports.UserServices = new UserServices();
