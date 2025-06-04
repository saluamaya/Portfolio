// Simple form validation and feedback for contact form

document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");

if (form) {
form.addEventListener("submit", (e) => {
e.preventDefault();

// Basic validation
const name = form.name.value.trim();
const email = form.email.value.trim();
const msg = form.message.value.trim();

if (!name || !email || !msg) {
message.style.color = "red";
message.textContent = "Please fill in all fields.";
return;
}

// Simple email regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
message.style.color = "red";
message.textContent = "Please enter a valid email.";
return;
}

// Simulate sending message
message.style.color = "green";
message.textContent = "Thank you for your message! I will get back to you soon.";

form.reset();
});
}
});
