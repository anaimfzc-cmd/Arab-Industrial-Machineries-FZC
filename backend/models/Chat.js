// models/Chat.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },

    //  ADD THESE
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);