class ModelMiddlewares {
  removeSlug() {
    this.schema.pre(/(save|[U|u]pdate)/g, function (next) {
      try {
        const data = this.getUpdate();
        delete data.$set.slug;
      } catch (error) {
        this.slug = undefined;
      }
      next();
    });
  }

  removeVirtual() {
    this.schema.set("toJSON", {
      virtuals: false,
    });
  }
}

module.exports.ModelMiddlewares = ModelMiddlewares;
