const { BaseServices } = require("../../base/services.base");
const { GroupModel } = require("../../models/group.models");
const { RedisCache } = require("../../utils/redis_cache.utils");
const { pagination } = require("../../utils/common.utils");
const { Options } = require("../../configs/app.configs");
const { selectFields } = require("../../utils/select_fields.utils");

const xlsx = require("xlsx");

class GroupServices extends BaseServices {
  constructor() {
    super(GroupModel);
  }
  // view data
  async view(query, option) {
    switch (option) {
      case Options.DETAIL:
        return await this.viewDetail(query);
      case Options.FILTER:
        return await pagination(query, GroupModel);
      default:
        return await pagination(query, GroupModel);
    }
  }
  async viewDetail(query) {
    try {
      delete query._;
      let queryString = JSON.stringify(query);
      let { fields, expands, ...filters } = JSON.parse(queryString);
      fields = [fields, expands].toString().split(",").join(" ");
      filters = selectFields(filters, "_id,slug");
      const key = `${GroupModel.collection.name}_detail_${queryString}`;
      const isCached = await RedisCache.getCache(key);
      if (isCached !== null) return JSON.parse(isCached);
      let data = await GroupModel.findOne(filters)
        .lean({ virtuals: true, defaults: true })
        .populate("members.member", "-role -flags -settings -permissions_expanded");
      let { members, host } = data;
      {
        let { settings, credential, my_learning, profile, ...shortHostInfo } = host;
        shortHostInfo = {
          ...shortHostInfo,
          photo: profile.photo,
          display_name: profile.display_name,
          email: credential.email,
          phone: credential.phone,
        };
        host = shortHostInfo;
      }
      members = members.map((mem) => {
        let { member, push_at } = mem;
        let { settings, credential, my_learning, profile, ...shortMemInfo } = member;
        shortMemInfo = {
          ...shortMemInfo,
          photo: profile.photo,
          display_name: profile.display_name,
          email: credential.email,
          phone: credential.phone,
          join_at: push_at,
        };
        return shortMemInfo;
      });
      data = { ...data, members: members, host: host };
      RedisCache.setCache(key, JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("View Detail 💥", error);
      return error;
    }
  }
  async addMembers(classroomId, members = [{}]) {
    try {
      RedisCache.delCacheMatch(`^${GroupModel.collection.name}|roles`);
      const options = { new: true, runValidators: true };
      const data = await GroupModel.findOneAndUpdate(
        { _id: classroomId },
        { $addToSet: { members: members }, update_at: Date.now() },
        options
      );
      console.log(members);
      return data;
    } catch (error) {
      console.log("Add Members 💥", error);
      return error;
    }
  }
}
module.exports.GroupServices = new GroupServices();
