const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const registerButton = document.querySelector('#registerButton');

registerButton.addEventListener('click', function(event) {
  if (nameInput.value === '') {
    nameInput.style.borderBottomColor = 'red';
    event.preventDefault();
  } else {
    nameInput.style.borderBottomColor = '#D9D9D9';
  }

  if (emailInput.value === '') {
    emailInput.style.borderBottomColor = 'red';
    event.preventDefault();
  } else {
    emailInput.style.borderBottomColor = '#D9D9D9';
  }

  if (passwordInput.value === '') {
    passwordInput.style.borderBottomColor = 'red';
    event.preventDefault();
  } else {
    passwordInput.style.borderBottomColor = '#D9D9D9';
  }

  if (nameInput.value !== '' && emailInput.value !== '' && passwordInput.value !== '') {
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
  }
});