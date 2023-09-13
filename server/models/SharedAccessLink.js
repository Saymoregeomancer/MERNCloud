const { Schema, model, ObjectId, Types } = require("mongoose");

const SharedAccessLink = new Schema(
  {
    links: [
      {
        type: String,
        required: true,
      },
    ],
    user: { type: ObjectId, ref: "User" },
  },
  { versionKey: false }
);

module.exports = model("SharedAccessLink", SharedAccessLink);
