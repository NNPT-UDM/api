const { Options } = require("../configs/app.configs");
const { pagination, viewDetail } = require("../utils/common.utils");
const APIFeatures = require("../utils/api_feature.utils");
const { MongooseEpressions } = require("../utils/mongoose_expressions.utitls");
const { RedisCache } = require("../utils/redis_cache.utils");
const fs = require("fs");
const { validateQuery } = require("../utils/url_parser.utils");
class BaseServices {
  constructor(model) {
    this.model = model;
  }
  // view data
  async view(query, option) {
    switch (option) {
      case Options.DETAIL:
        return await viewDetail(query, this.model);
      case Options.FILTER:
        return await pagination(query, this.model);
      default:
        return await pagination(query, this.model);
    }
  }

  async add(body) {
    RedisCache.delCacheMatch(`^${this.model.collection.name}|roles`);
    return await this.model.create(body);
  }

  async addMany(body) {
    RedisCache.delCacheMatch(`^${this.model.collection.name}|roles`);
    return await this.model.insertMany(body, { forceServerObjectId: true });
  }

  async edit(query, body) {
    RedisCache.delCacheMatch(`^${this.model.collection.name}|roles`);
    let expressions = MongooseEpressions(body);
    const options = { new: true, runValidators: true };
    console.log(query, expressions);
    return await this.model.findOneAndUpdate(query, expressions, options);
  }

  async delete(id) {
    RedisCache.delCacheMatch(`^${this.model.collection.name}|roles`);
    return await this.model.findOneAndDelete({ _id: id });
  }

  async activate(id) {
    RedisCache.delCacheMatch(`^${this.model.collection.name}|roles`);
    return await this.model.findOneAndUpdate({ _id: id }, { activated: true }, { new: true });
  }

  async disable(id) {
    RedisCache.delCacheMatch(`^${this.model.collection.name}|roles`);
    return await this.model.findOneAndUpdate({ _id: id }, { activated: false }, { new: true });
  }
}
module.exports.BaseServices = BaseServices;
