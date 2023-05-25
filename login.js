const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const connectButton = document.querySelector('#connectButton');

connectButton.addEventListener('click', function(event) {

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

  if (emailInput.value !== '' && passwordInput.value !== '') {
    emailInput.value = '';
    passwordInput.value = '';
  }
});