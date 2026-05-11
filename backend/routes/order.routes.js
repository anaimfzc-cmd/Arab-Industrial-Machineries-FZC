import express from "express";
import Order from "../models/order.model.js";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrderStatus);

// 🔥 USER BOOKINGS
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    }).populate("serviceId");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;