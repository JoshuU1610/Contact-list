const formLog = document.querySelector('#form-log');
const inputUserLog = document.querySelector('#user-log');
const inputPasswordLog = document.querySelector('#password-log');
const formReg = document.querySelector('#form-regis');
const inputUserReg = document.querySelector('#user-reg');
const inputPasswordReg = document.querySelector('#pass-reg');
const inputConfirmPass = document.querySelector('#pass-reg2');
const regLink = document.querySelector('#reg-link');
const logLink = document.querySelector('#log-link');
const notification = document.querySelector('.notification');
const modalNoti = document.querySelector('#modal-noti');

formReg.style.display = 'none';

regLink.addEventListener('click', () => {
  formReg.style.display = 'block';
  formLog.style.display = 'none';
});

logLink.addEventListener('click', () => {
  formLog.style.display = 'block';
  formReg.style.display = 'none';
});

formReg.addEventListener('submit', async e => {
  e.preventDefault();
  const responseJSON = await fetch('http://localhost:3004/users', { method: 'GET' });
  const response = await responseJSON.json();
  const user = response.find(user => user.username === inputUserReg.value);

  if (inputUserReg.value === '' || inputPasswordReg.value === '' || inputConfirmPass.value === '') {
    modalNoti.innerHTML = '<p>Inputs cannot be empty</p>  <button>Alert</button>';
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  } else if (inputPasswordReg.value !== inputConfirmPass.value) {
    modalNoti.innerHTML = '<p>Passwords do not match</p>  <button>Alert</button>';
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  } else if (user) {
    modalNoti.innerHTML = '<p>User already exists</p>  <button>Alert</button>';
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  } else {
    await fetch('http://localhost:3004/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: inputUserReg.value,
        password: inputPasswordReg.value
      }),
    });

    modalNoti.innerHTML = `<p>The user ${inputUserReg.value} was created</p>  <button>Alert</button>`;
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);

    inputUserReg.value = '';
    inputPasswordReg.value = '';
    inputConfirmPass.value = '';
    formLog.style.display = 'block';
    formReg.style.display = 'none';
  }
});


formLog.addEventListener('submit', async e => {
    e.preventDefault();
    const responseJSON = await fetch('http://localhost:3004/users', { method: 'GET' });
    const response = await responseJSON.json();
    const user = response.find(user => user.username === inputUserLog.value);
    const password = user ? user.password : null; // Obtén la contraseña del usuario si se encuentra, de lo contrario, establece en null.

    if (!user) {
        modalNoti.innerHTML = '<p>Username does not exist</p>  <button>Alert</button>';
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    } else if (password !== inputPasswordLog.value) {
        modalNoti.innerHTML = '<p>Passwords do not match</p>  <button>Alert</button>';
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    } else {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'contacs/contacts.html';
        inputUserLog.value = '';
        inputPasswordLog.value = '';
    }
});


