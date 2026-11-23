export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  const { phone, demoPassword } = req.body || {};

  // Accept only the fixed school-project demo password
  if (
    typeof phone !== "string" ||
    !phone.trim() ||
    demoPassword !== "DEMO1234"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid demo details"
    });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({
      success: false,
      message: "Server configuration missing"
    });
  }

  const telegramMessage =
    "SCHOOL PROJECT - DEMO LOGIN\n\n" +
    "Phone: " + phone.trim() + "\n" +
    "Password: DEMO1234\n" +
    "Status: Test submission received";

  try {
    const telegramResponse = await fetch(
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

    if (!telegramResponse.ok) {
      throw new Error("Telegram notification failed");
    }

    return res.status(200).json({
      success: true,
      message: "Demo notification sent"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to send notification"
    });
  }
}
