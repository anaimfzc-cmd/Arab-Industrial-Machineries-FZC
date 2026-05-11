import express from "express";
import {
  createEnquiry,
  getAllContacts,
  deleteContact
} from "../controllers/contact.controller.js";

const router = express.Router();

// Create enquiry
router.post("/", createEnquiry);

// Get all enquiries
router.get("/", getAllContacts);

// Soft delete
router.delete("/:id", deleteContact);

export default router;