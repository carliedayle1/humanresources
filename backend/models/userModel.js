import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    userType: {
      type: Number,
      required: true,
      default: 1,
    },
    name: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    profilePicture: {
      type: String,
      required: true,
      default: "/images/man.png",
    },
    password: {
      type: String,
      required: true,
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
      type: String,
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
    },
    dateHired: {
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
