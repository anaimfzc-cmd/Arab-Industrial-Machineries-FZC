import Order from "../models/order.model.js";

// CREATE ORDER (Booking)
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL ORDERS (Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("serviceId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};