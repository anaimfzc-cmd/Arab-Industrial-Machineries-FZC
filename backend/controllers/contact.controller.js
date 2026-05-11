import Enquiry from "../models/Enquiry.js";
// import { sendEmail } from "../utils/emailService.js"; // 🔒 future use

// ===============================
// CREATE ENQUIRY (POST)
// ===============================
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Message are required",
      });
    }

    //  Save enquiry to DB
    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      company,
      subject,
      message,
    });

    console.log("✅ Enquiry saved:", enquiry._id);

    //  Email sending (future-ready)
    /*
    try {
      await sendEmail({
        to: "contactaimuae@gmail.com",
        subject: subject || "New Enquiry Received",
        html: `
          <h2>New Contact Request</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Company:</b> ${company || "N/A"}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      });
      console.log(" Email sent successfully");
    } catch (emailError) {
      console.error(" Email failed but enquiry saved", emailError);
    }
    */

    //  Response to frontend
    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
    });

  } catch (error) {
    console.error("❌ Enquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
};

// ===============================
// GET ALL ENQUIRIES (ADMIN)
// ===============================
export const getAllContacts = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ isDeleted: false })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("❌ Fetch enquiries error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
    });
  }
};

// ===============================
// SOFT DELETE ENQUIRY
// ===============================
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await Enquiry.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    res.status(200).json({
      success: true,
      message: "Enquiry archived successfully",
    });

  } catch (error) {
    console.error("❌ Delete enquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to archive enquiry",
    });
  }
};
