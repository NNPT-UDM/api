module.exports.CourseMiddleware = (schema) => {
    schema.virtual("groups", {
        ref: "Group",
        foreignField: "course",
        localField: "_id",
    });
    schema.pre(/^findOne/, function (next) {
        this.populate("groups");
        next();
    });
    schema.pre("find", function (next) {
        this.find().select("-lectures -references");
        next();
    })
}