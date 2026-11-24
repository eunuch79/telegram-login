const form = document.getElementById("accessForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = form.querySelector(
    'input[name="message"]'
  );

  const text = input.value.trim();

  if (!text) {
    message.textContent = "Enter your message.";
    return;
  }

  message.textContent = "Sending...";

  try {
    const response = await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error("Failed");
    }

    message.textContent = "Message sent successfully!";
    form.reset();

  } catch (error) {
    message.textContent = "Unable to send. Try again.";
  }
});
