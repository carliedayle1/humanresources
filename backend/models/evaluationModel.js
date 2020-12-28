import mongoose from "mongoose";

const evaluationModel = mongoose.Schema(
  {
    rank: {
      type: String,
    },
    total: {
      type: Number,
    },
    qce: {
      type: Number,
    },
    ratings: [
      {
        rating: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Rating",
        },
      },
    ],
    verifiedBy: {
      type: String,
    },
    verifyType: {
      type: Number,
      require: true,
    },
    user: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Evaluation = mongoose.model("Evaluation", evaluationModel);

export default Evaluation;
