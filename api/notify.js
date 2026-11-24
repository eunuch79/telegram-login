
const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/notify", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        error: "Invalid message"
      });
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: `New website submission:\n\n${text}`
        })
      }
    );

    if (!telegramResponse.ok) {
      throw new Error("Telegram error");
    }

    res.json({ success: true });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Notification failed"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
