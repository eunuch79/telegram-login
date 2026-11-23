const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  message.textContent =
    "Demo submitted successfully! No password was collected or sent.";

  message.style.color = "#22c55e";

  passwordInput.value = "";
});
