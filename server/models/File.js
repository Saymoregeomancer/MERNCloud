const { Schema, model, ObjectId, Types } = require("mongoose");

const File = new Schema(
  {
    selected: { type: Boolean, default: false },
    name: { type: String, required: true },
    type: { type: String, required: true },
    accessLink: { type: String },
    size: { type: Number, default: 0 },
    path: { type: String, default: null },
    date: { type: Date, default: Date.now() },
    user: { type: ObjectId, ref: "User" },
    parent: { type: ObjectId, ref: "File" },
    shared: { type: Boolean, default: false },
  },
  { versionKey: false }
);

module.exports = model("File", File);
