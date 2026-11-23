export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { phone } = req.body || {};

  if (
    typeof phone !== "string" ||
    phone.length < 7 ||
    phone.length > 20
  ) {
    return res.status(400).json({
      error: "Invalid demo phone number"
    });
  }

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({
      error: "Server configuration missing"
    });
  }

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `New school demo submission\nMobile: ${phone}\nPassword: Not collected`
      })
    }
  );

  if (!telegramResponse.ok) {
    return res.status(502).json({
      error: "Telegram notification failed"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Notification sent"
  });
          }
