import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    userType: {
      type: Number,
      required: true,
      default: 1,
    },
    firstname: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isSuperAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEvaluator: {
      type: Boolean,
      required: true,
      default: false,
    },
    position: {
      type: Number,
    },
    rank: {
      type: String,
    },
    college: {
      type: String,
    },
    campus: {
      type: String,
    },
    leaveCredits: {
      type: Number,
      default: 0,
    },
    evalPoints: {
      type: Number,
      default: 0,
    },
    absences: {
      type: Number,
      default: 0,
    },
    dateHired: {
      type: String,
    },
    program: {
      type: String,
    },

    notifications: [
      {
        url: {
          type: String,
        },
        message: {
          type: String,
        },
        seen: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
