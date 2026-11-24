
document.querySelectorAll("form[data-telegram]").forEach(form => {

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const message = document.getElementById("message");

    const fields = Array.from(form.elements)
      .filter(field =>
        field.matches("input, textarea") &&
        !["password", "hidden"].includes(field.type) &&
        field.type !== "submit"
      );

    const submittedText = fields
      .map(field => {
        const value = field.value.trim();
        if (!value) return null;

        return `${field.name || field.id || "Message"}: ${value}`;
      })
      .filter(Boolean)
      .join("\n");

    if (!submittedText) {
      message.textContent = "Please enter a message.";
      return;
    }

    message.textContent = "Sending...";

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: submittedText,
          form: form.id || "Website form"
        })
      });

      if (!response.ok) throw new Error("Failed");

      message.textContent = "Submitted successfully!";
      form.reset();

    } catch (error) {
      message.textContent = "Unable to submit. Try again.";
    }
  });

});
