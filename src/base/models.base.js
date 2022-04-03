const mongoose = require("mongoose");
const { makeSlug } = require("../utils/common.utils");
const Schema = mongoose.Schema;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const mongooseLeanDefaults = require("mongoose-lean-defaults").default;

class BaseModels {
  schema;
  name;
  collection;
  index;

  init({ definition, options } = {}) {
    this.schema = new Schema(
      {
        ...definition,
        create_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now },
      },
      {
        ...options,
        toJSON: {
          virtuals: true,
          // transform: deleteIdFields,
        },
        toObject: {
          virtuals: true,
          // transform: deleteIdFields,
        },
        versionKey: false,
      }
    );
    this.schema.index({ ...this.index, _id: "text", slug: "text" });

    // lean virtuals
    this.schema.plugin(mongooseLeanVirtuals);
    this.schema.plugin(mongooseLeanDefaults);

    this.schema.pre("findOneAndUpdate", function (next) {
      this.set({ update_at: Date.now() });
      next();
    });
  }

  setSlug(field) {
    this.schema.add({
      slug: { type: String, lowercase: true, unique: true, sparse: true },
    });

    this.schema.pre("save", function (next) {
      if (this[field]) this.slug = makeSlug(this[field]);
      next();
    });
    this.schema.post(/^findOneAnd/, async function (doc, next) {
      const { $set } = this.getUpdate();
      if ($set[field]) await this.updateOne({ _id: doc._id }, { slug: makeSlug($set[field]) });
      next();
    });
  }
  get export() {
    return mongoose.model(this.name, this.schema, this.collection);
  }
}
module.exports.BaseModels = BaseModels;
