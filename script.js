const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const phoneInput =
    loginForm.querySelector('input[type="tel"]') ||
    loginForm.querySelector('input[name="phone"]') ||
    loginForm.querySelector('input:not([type="password"])');

  const phone = phoneInput?.value.trim();

  if (!phone) {
    message.textContent = "Enter a demo mobile number.";
    return;
  }

  message.textContent = "Sending demo notification...";

  try {
    const response = await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone })
    });

    if (!response.ok) {
      throw new Error("Notification failed");
    }

    message.textContent =
      "Demo notification sent successfully!";

    message.style.color = "#22c55e";
    loginForm.reset();

  } catch (error) {
    message.textContent =
      "Unable to send notification. Please try again.";

    message.style.color = "#ef4444";
  }
});
