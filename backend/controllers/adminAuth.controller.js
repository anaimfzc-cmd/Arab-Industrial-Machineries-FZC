import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

export const adminLogin = async (req, res) => {

  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password required",
      });
    }

    // FIND ADMIN
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      token,
    });

  } catch (error) {

    console.error(
      "Admin login error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });

  }
};

export const changePassword = async (
  req,
  res
) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    // VALIDATION
    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        message:
          "All fields required",
      });
    }

    // FIND ADMIN
    const admin =
      await Admin.findById(
        req.admin.id
      );

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // CHECK CURRENT PASSWORD
    const isMatch =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message:
          "Current password incorrect",
      });
    }

    // HASH NEW PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    // SAVE
    admin.password =
      hashedPassword;

    await admin.save();

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });

  } catch (error) {

    console.error(
      "Change password error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });

  }
};

export const verifyAdmin = async (
  req,
  res
) => {

  try {

    res.status(200).json({
      success: true,
      admin: req.admin,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Verification failed",
    });

  }
};