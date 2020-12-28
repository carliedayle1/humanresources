import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Document from "./models/documentModel.js";
import Evaluation from "./models/evaluationModel.js";
import LeaveCredit from "./models/leaveCreditModel.js";
import Rating from "./models/ratingModel.js";
import Rank from "./models/rankModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Document.deleteMany();
    await Evaluation.deleteMany();
    await LeaveCredit.deleteMany();
    await Rank.deleteMany();
    await Rating.deleteMany();

    const createdUsers = await User.insertMany(users);

    const filteredRanks = createdUsers.filter((user) => {
      return user.rank;
    });

    const ranks = filteredRanks.map((user) => {
      return { name: user.rank, user: user._id };
    });

    await Rank.insertMany(ranks);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Document.deleteMany();
    await Evaluation.deleteMany();
    await LeaveCredit.deleteMany();
    await Rank.deleteMany();
    await Rating.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
