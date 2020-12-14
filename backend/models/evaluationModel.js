import mongoose from "mongoose";

const ratingModel = mongoose.Schema(
  {
    educationalQualification: {
      type: Number,
    },
    academicExperience: {
      type: Number,
    },
    professionalAchievement: {
      type: Number,
    },
    totalPoints: {
      type: Number,
    },
    qcePoints: {
      type: Number,
    },
    evaluatedBy: {
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

const evaluationModel = mongoose.Schema(
  {
    rank: {
      type: String,
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
      default: 0.0,
    },
    ratings: [ratingModel],
    verifiedBy: {
      type: String,
      required: true,
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

const Evaluation = mongoose.model("Evaluation", evaluationModel);

export default Evaluation;
