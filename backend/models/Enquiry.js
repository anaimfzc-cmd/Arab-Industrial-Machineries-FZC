import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    isDeleted: {
    type: Boolean,
    default: false},
  },
  { timestamps: true },
  
);

export default mongoose.model("Enquiry", enquirySchema);
