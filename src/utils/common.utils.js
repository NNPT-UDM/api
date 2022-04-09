const mongoose = require("mongoose");
const slugify = require("slugify");
const ObjectId = mongoose.Types.ObjectId;
const has = Object.prototype.hasOwnProperty;
const { RedisCache } = require("./redis_cache.utils");
const { removeTones } = require("./regex_special.utils");
const { selectFields } = require("./select_fields.utils");

class CommonUtils {
  // detail
  static async viewDetail(query, model) {
    try {
      delete query._;
      let queryString = JSON.stringify(query);
      let { fields, expands, ...filters } = JSON.parse(queryString);
      fields = [fields, expands].toString().split(",").join(" ");
      filters = selectFields(filters, "_id,slug");
      // console.log("current_query", filters);
      const data = await model.findOne(filters).select(fields);
      return data;
    } catch (error) {
      console.log("View Detail 💥", error);
      return error;
    }
  }

  // pagination
  static async pagination(query, model) {
    try {
      // Advanced filtering
      delete query._;
      let queryString = JSON.stringify(query);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt|ne|or|and|nor|not|regex)\b/g,
        (match) => `$${match}`
      );
      let { per_page, page, sort, fields, expands, search, ...filters } = JSON.parse(queryString);
      const perPage = per_page * 1 || 10;
      const pageIndex = page * 1 || 1;
      fields = [fields, expands].toString().split(",").join(" ");
      sort = !sort ? "-create_at" : sort.split(",").join(" ");
      // list columns belong to current collection
      const columns = Object.keys(model.schema.paths).toString();
      if (search) {
        filters = {
          ...filters,
          $text: { $search: search },
        };
      }

      filters = selectFields(filters, [columns, "$or,$not,$nor,$and,$text"].join(","));
      // console.log("current_query", filters);
      const key = `${model.collection.name}_filter_${queryString}`;
      // console.log(key);
      const isCached = await RedisCache.getCache(key);
      if (isCached !== null) {
        return JSON.parse(isCached);
      }
      const data = await model
        .find(filters)
        .lean({ virtuals: true, defaults: true }) // return raw data, it be faster
        .select(fields)
        .sort(sort)
        .skip(perPage * pageIndex - perPage)
        .limit(perPage);
      // const total = await model.countDocuments(filters);
      // const collection = model.collection.name;
      // const response = {
      //   tag: collection,
      //   page: pageIndex,
      //   per_page: total > perPage ? perPage : total,
      //   total_pages: Math.ceil(total / perPage),
      //   total: total,
      //   results: data,
      //   columns: fields.trim() || columns,
      // };
      const response = data || [];
      RedisCache.setCache(key, JSON.stringify(response));
      return response;
    } catch (error) {
      console.log("Pagination 💥", error);
      return error;
    }
  }

  static viewQuery(query) {
    let option;
    const detailQueries = ["_id", "slug"];
    const keys = Object.keys(query);
    if (detailQueries.filter((x) => keys.includes(x)).length > 0) {
      option = "detail";
    } else {
      option = "filter";
    }
    // console.log({ origin_query: query, option: option });
    return { query: query, option: option };
  }

  static makeSlug(text) {
    return slugify(removeTones(text), { lower: true });
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  static getRandomRange(min, max) {
    return Math.round(min + Math.random() * max);
  }

  static get objectId() {
    return ObjectId;
  }

  static arrayMerge(base, addendum) {
    var out = [].concat(base);
    for (var i = 0, len = addendum.length; i < len; i++) {
      if (base.indexOf(addendum[i]) < 0) {
        out.push(addendum[i]);
      }
    }
    return out;
  }

  static removeEmptyOrNull(obj) {
    Object.keys(obj).forEach(
      (k) =>
        (obj[k] && typeof obj[k] === "object" && this.removeEmptyOrNull(obj[k])) ||
        (!obj[k] && obj[k] !== undefined && delete obj[k])
    );
    return obj;
  }

  static trimObj(obj) {
    if (!Array.isArray(obj) && typeof obj != "object") return obj;
    return Object.keys(obj).reduce(
      function (acc, key) {
        acc[key.trim()] = typeof obj[key] == "string" ? obj[key].trim() : trimObj(obj[key]);
        return acc;
      },
      Array.isArray(obj) ? [] : {}
    );
  }
}

module.exports = CommonUtils;
