const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  clearErrors();
  let isValid = validateInputs();

  if (isValid) {
    form.reset();
    successMessage.classList.remove('hide');
    setTimeout(() => {
      successMessage.classList.add('hide');
    }, 3000);
  }
});

function validateInputs() {
  let valid = true;

  if (nameInput.value.trim().length < 2) {
    showError('name-error', 'Name must be at least 2 characters.');
    valid = false;
  }

  if (!validateEmail(emailInput.value.trim())) {
    showError('email-error', 'Please enter a valid email.');
    valid = false;
  }

  if (messageInput.value.trim().length < 10) {
    showError('message-error', 'Message must be at least 10 characters.');
    valid = false;
  }

  return valid;
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  ['name-error', 'email-error', 'message-error'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
