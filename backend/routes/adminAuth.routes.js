import express from "express";
import { adminLogin, changePassword, verifyAdmin } from "../controllers/adminAuth.controller.js";
import { protectAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);

router.put(
  "/change-password",
  protectAdmin,
  changePassword
);

router.get(
  "/verify",
  protectAdmin,
  verifyAdmin
);

export default router;
