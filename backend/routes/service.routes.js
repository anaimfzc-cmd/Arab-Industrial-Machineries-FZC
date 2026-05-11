import express from "express";
import {
  createService,
  getServices,
  deleteService,
} from "../controllers/service.controller.js";

const router = express.Router();

router.post("/", createService);
router.get("/", getServices);
router.delete("/:id", deleteService);
router.get("/", getServices);
router.post("/", createService);
router.delete("/:id", deleteService);

export default router;