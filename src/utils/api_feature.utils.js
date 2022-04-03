const { RedisCache } = require("./redis_cache.utils");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    // Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt|ne|or|and|nor|not|regex)\b/g,
      (match) => `$${match}`
    );
    let { _, per_page, page, sort, fields, expands, search, ...filters } =
      JSON.parse(queryString);

    this.query = this.query.find(filters);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // sort="-create_at,-other_fields..."
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-create_at");
    }

    return this;
  }

  limitFields() {
    let { fields, expands } = this.queryString;
    fields = [fields, expands].toString().split(",").join(" ");
    if (fields) {
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const { page, per_page } = this.queryString;
    const pageIndex = page * 1 || 1;
    const perPage = per_page * 1 || 10;
    const skip = (pageIndex - 1) * perPage;

    this.query = this.query.skip(skip).limit(perPage);

    return this;
  }
}
module.exports = APIFeatures;
