import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  try {

    const existingAdmin = await Admin.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await Admin.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log(" Admin created");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();