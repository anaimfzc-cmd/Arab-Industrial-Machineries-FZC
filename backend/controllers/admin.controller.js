import Enquiry from "../models/Enquiry.js";

// GET all enquiries (Admin)
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("❌ Admin fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
    });
  }
};
