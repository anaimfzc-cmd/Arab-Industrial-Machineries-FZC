// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: String, // "user" | "admin"
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);