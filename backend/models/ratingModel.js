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
    evaluatedBy: {
      type: String,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    ratingType: {
      type: Number,
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

const Rating = mongoose.model("Rating", ratingModel);

export default Rating;
