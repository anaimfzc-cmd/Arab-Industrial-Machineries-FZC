router.post("/send", async (req, res) => {
  const { chat_id, sender_id, sender_role, text } = req.body;

  const message = await Message.create({
    chat_id,
    sender_id,
    sender_role,
    text,
  });

  res.json(message);
});