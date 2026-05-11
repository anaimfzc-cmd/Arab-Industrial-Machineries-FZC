import express from "express";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import Order from "../models/order.model.js";

const router = express.Router();


// =============================
// GET ALL CHATS + ORDER DETAILS
// =============================
router.get("/", async (req, res) => {

  try {

    const chats = await Chat.find()
      .sort({ updatedAt: -1 });

    const formattedChats =
      await Promise.all(

        chats.map(async (chat) => {

          // FIND RELATED ORDER
          const order =
            await Order.findOne({

              // IF user_id STORES EMAIL
              email: chat.user_id,

              // IF USING CLERK ID:
              // clerkUserId: chat.user_id

            }).populate("serviceId");

          return {

            _id: chat._id,

            user_id: chat.user_id,

            name: chat.name,

            email: chat.email,

            updatedAt: chat.updatedAt,

            order,

          };
        })
      );

    res.json(formattedChats);

  } catch (err) {

    console.error(
      "Chat fetch error:",
      err
    );

    res.status(500).json({
      message: err.message,
    });
  }
});


// =============================
// UNREAD COUNT
// =============================
router.get("/unread/count", async (req, res) => {

  try {

    const count =
      await Message.countDocuments({
        sender: "user",
        seen: false,
      });

    res.json({
      count,
    });

  } catch (err) {

    console.error(
      "Unread count error:",
      err
    );

    res.status(500).json({
      error: err.message,
    });

  }
});


// =============================
// GET MESSAGES FOR A USER
// =============================
router.get("/:userId", async (req, res) => {

  try {

    const chat =
      await Chat.findOne({
        user_id:
          req.params.userId,
      });

    if (!chat)
      return res.json([]);

    // FETCH FROM MESSAGE COLLECTION
    const messages =
      await Message.find({
        chat_id: chat._id,
      }).sort({
        createdAt: 1,
      });

    res.json(messages);

  } catch (err) {

    console.error(
      "Fetch messages error:",
      err
    );

    res.status(500).json({
      message: err.message,
    });
  }
});


// =============================
// SEND MESSAGE
// =============================
router.post("/send", async (req, res) => {

  try {

    const {
      userId,
      text,
      sender,
      name,
      email,
    } = req.body;

    let chat =
      await Chat.findOne({
        user_id: userId,
      });

    // CREATE CHAT
    if (!chat) {

      chat =
        await Chat.create({
          user_id: userId,
          name:
            name || "User",
          email:
            email || "",
        });
    }

    // UPDATE NAME IF MISSING
    if (!chat.name && name) {

      chat.name = name;

      chat.email = email;

      await chat.save();
    }

    // SAVE MESSAGE
    const message =
      await Message.create({

        chat_id: chat._id,

        sender,

        text,

      });

    // UPDATE CHAT TIME
    chat.updatedAt =
      new Date();

    await chat.save();

    res.json({

      text: message.text,

      sender:
        message.sender,

      createdAt:
        message.createdAt,

    });

  } catch (err) {

    console.error(
      "Send message error:",
      err
    );

    res.status(500).json({
      message:
        "Error sending message",
    });
  }
});


// =============================
// MARK AS SEEN
// =============================
router.post("/seen", async (req, res) => {

  try {

    const { userId } =
      req.body;

    const chat =
      await Chat.findOne({
        user_id: userId,
      });

    if (chat) {

      await Message.updateMany(

        {
          chat_id: chat._id,
          sender: "user",
        },

        {
          seen: true,
        }
      );
    }

    res.json({
      message:
        "Seen updated",
    });

  } catch (err) {

    console.error(
      "Seen error:",
      err
    );

    res.status(500).json({
      message:
        err.message,
    });
  }
});

export default router;