const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        workId: {type: mongoose.Types.ObjectId, ref: "Work"},
        title: {type: String},
        log: {
            code: {type: Number},
            name: {type: String},
            description: {type: String},
        },
        episode: {type: String},
        create_at: {type: Date, default: Date.now()},
        update_at: {type: Date, default: Date.now()}
    },
    {versionKey: false}
);

module.exports.Log = mongoose.model("Log", schema, "logs");
