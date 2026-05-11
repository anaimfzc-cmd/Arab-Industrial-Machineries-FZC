import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

//  SYNC USER FROM CLERK
router.post("/sync", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "No body received" });
    }

    const { clerkId, email, name } = req.body;

    if (!clerkId) {
      return res.status(400).json({ message: "Missing clerkId" });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        email,
        name,
      });
    }

    res.json(user);
  } catch (err) {
    console.error("🔥 SYNC ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;