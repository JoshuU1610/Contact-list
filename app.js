const formLog = document.querySelector('#form-log');
const inputUserLog = document.querySelector('#user-log');
const inputPasswordLog = document.querySelector('#password-log');
const formReg = document.querySelector('#form-regis');
const inputUserReg = document.querySelector('#user-reg');
const inputPasswordReg = document.querySelector('#pass-reg');
const inputConfirmPass = document.querySelector('#pass-reg2');


formReg.addEventListener('submit', async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:3004/users', { method: 'GET' });
    const users = await response.json();
    const user = users.find(user => 
        user.username === inputUserReg.value
        );
    console.log(users);

}); 