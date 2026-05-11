import express from "express";
import { getAllEnquiries } from "../controllers/admin.controller.js";

const router = express.Router();

// Admin – view all enquiries
router.get("/enquiries", getAllEnquiries);

export default router;
