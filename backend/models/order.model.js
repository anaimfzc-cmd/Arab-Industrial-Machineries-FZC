import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    name: String,
    email: String,
    phone: String,
    description: String,
    preferredDate: Date,

    status: {
      type: String,
      enum: ["Pending", "Approved", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);