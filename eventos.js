const inputName = document.querySelector('#input-name');
const inputNumber = document.querySelector('#input-number');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');
const list = document.querySelector('#list');


const NUMBER_REGEX = /^((412)|(212)|(414)|(424)|(416)|(426))[0-9]{7}$/;
const NAME_REGEX = /a/;


// Funcion creada para validar que lo que esta dentro del input este bien puesto
const validar = (input, verification) => {

    if (nameValidation && numberValidation) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
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
    nameValidation = inputName.value.length >= 3;
    validar(inputName, nameValidation);
});

// Evento donde se llama al input del numero 
inputNumber.addEventListener('input', e => {
    // console.log(e.target.value);
    numberValidation = NUMBER_REGEX.test(inputNumber.value);
    validar(inputNumber, numberValidation);
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


// Evento para elminar y editar
list.addEventListener('click', e => {
    if(e.target.closest('.delete-icon')){

        e.target.closest('.delete-icon').parentElement.remove();
        localStorage.setItem('listContacts', list.innerHTML);

    }

    if (e.target.closest('.edit-icon')) {

        const inputEditName = e.target.closest('.edit-icon').parentElement.children[1];
        const inputEditNumber = e.target.closest('.edit-icon').parentElement.children[2];

        // nameValidation = inputEditName.value.length >= 3;
        // validar(inputEditName, nameValidation);

        if (inputEditName.hasAttribute('readonly')) {

            inputEditName.removeAttribute('readonly');
            console.log(inputEditName.value);

        } else {

            inputEditName.setAttribute('readonly',true);
            inputEditName.setAttribute('value', inputEditName.value);
            console.log(inputEditName.value);
            localStorage.setItem('listContacts', list.innerHTML);

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