import mongoose from "mongoose";

const rankModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Rank = mongoose.model("Rank", rankModel);

export default Rank;
