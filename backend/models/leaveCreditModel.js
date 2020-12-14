import mongoose from "mongoose";

const leaveCredit = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    particular: {
      type: String,
    },
    earned: {
      type: Number,
    },
    absences: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    createdBy: {
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

const LeaveCredit = mongoose.model("LeaveCredit", leaveCredit);

export default LeaveCredit;
