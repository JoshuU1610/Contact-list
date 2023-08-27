const inputName = document.querySelector('#input-name');
const inputNumber = document.querySelector('#input-number');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');
const list = document.querySelector('#list');


const NUMBER_REGEX = /^((412)|(212)|(414)|(424)|(416)|(426))[0-9]{7}$/;
const NAME_REGEX = /^[A-Z][a-z]{2,}/;


// Funcion creada para validar que lo que esta dentro del input este bien puesto
const validar = (input, verification, btn) => {

    if (nameValidation && numberValidation) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }

    const message = input.parentElement.children[1];

    if(!input){
        input.classList.remove('error');
        input.classList.remove('success');
        message.classList.remove('show');
    } else if (verification) {
        input.classList.remove('error');
        input.classList.add('success');
        message.classList.remove('show');
    } else {
        input.classList.add('error');
        input.classList.remove('success');
        message.classList.add('show');
    }
}


// Variables para la validacion
let numberValidation = false;
let nameValidation = false;

// Evento donde se llama al input del nombre 
inputName.addEventListener('input', e => {
    // console.log(e.target.value);
    nameValidation = NAME_REGEX.test(inputName.value);
    validar(inputName, nameValidation, formBtn);
});

// Evento donde se llama al input del numero 
inputNumber.addEventListener('input', e => {
    // console.log(e.target.value);
    numberValidation = NUMBER_REGEX.test(inputNumber.value);
    validar(inputNumber, numberValidation, formBtn);
});


// Evento donde enviamos los datos a la lista para mostrarlos y guardarlos
form.addEventListener('submit', e => {
    e.preventDefault();
    const li = document.createElement('li');
    li.innerHTML = `
    <button class="delete-icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
      </svg>
</button>
<input type="text" value="${inputName.value}" readonly>
<input type="text" value="${inputNumber.value}" readonly>
<button class="edit-icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
</button>
    `;
    list.append(li);
    localStorage.setItem('listContacts', list.innerHTML);
})

const EditBtn = document.querySelector('.edit-icon')
// Evento para elminar y editar
list.addEventListener('click', e => {

    // const successbtn = document.createElement('button');
    // successbtn.innerHTML = `<button class="success-icon">
    // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    //     <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
    // </svg>
    // </button>
    // `;

    if(e.target.closest('.delete-icon')){

        e.target.closest('.delete-icon').parentElement.remove();
        localStorage.setItem('listContacts', list.innerHTML);

    }

    if (e.target.closest('.edit-icon')) {

        const inputEditName = e.target.closest('.edit-icon').parentElement.children[1];
        const inputEditNumber = e.target.closest('.edit-icon').parentElement.children[2];
        nameValidation = NAME_REGEX.test(inputName.value);
        numberValidation = NUMBER_REGEX.test(inputNumber.value);

        if (inputEditName.hasAttribute('readonly')) {

            inputEditName.removeAttribute('readonly');
            

        } else {

            inputEditName.setAttribute('readonly',true);
            inputEditName.setAttribute('value', inputEditName.value);
            localStorage.setItem('listContacts', list.innerHTML);
            validar(inputEditName, nameValidation, EditBtn);
            console.log(validar);
        }

        if (inputEditNumber.hasAttribute('readonly')) {

            inputEditNumber.removeAttribute('readonly');
            console.log(inputEditNumber.value);
            
        } else {

            inputEditNumber.setAttribute('readonly',true);
            inputEditNumber.setAttribute('value', inputEditNumber.value);
            console.log(inputEditNumber.value);
            localStorage.setItem('listContacts', list.innerHTML);
        }
    }
})


// Evento donde llamamos los datos guardados en el localStorage a la pagina
window.onload = () => {

    list.innerHTML = localStorage.getItem('listContacts');
    
}