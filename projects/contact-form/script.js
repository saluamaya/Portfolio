const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;
  clearErrors();

  if (nameInput.value.trim() === '') {
    setError(nameInput, 'Name is required');
    isValid = false;
  }

  if (emailInput.value.trim() === '') {
    setError(emailInput, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    setError(emailInput, 'Please enter a valid email');
    isValid = false;
  }

  if (messageInput.value.trim() === '') {
    setError(messageInput, 'Message is required');
    isValid = false;
  }

  if (isValid) {
    form.reset();
    successMessage.classList.remove('hide');
    setTimeout(() => {
      successMessage.classList.add('hide');
    }, 3000);
  }
});

function setError(element, message) {
  const parent = element.parentElement;
  const errorDisplay = parent.querySelector('.error-message');
  errorDisplay.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
