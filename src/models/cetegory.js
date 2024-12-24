import mongoose from "mongoose";

const cetegorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "black",
    },
    description: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const CetegoryMdl = mongoose.model("category", cetegorySchema);

export default CetegoryMdl;
