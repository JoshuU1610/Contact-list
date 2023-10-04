const inputName = document.querySelector('#input-name');
const inputNumber = document.querySelector('#input-number');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');
const list = document.querySelector('#list');
const liElements = document.querySelectorAll('#myUl li');
const liElementsWithSubMenu = document.querySelectorAll('.menu ul li');
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const menuIcon = document.querySelector('.menu-icon');
const menuIconActive = document.querySelector('.menu-icon-active');
const inputNumber1 = document.querySelector('#name-edit');
const inputName1 = document.querySelector('#number-edit');
const homeButton = document.getElementById('home');
const addButton = document.getElementById('add');
const contactsDiv = document.querySelector('.contacts');
const formDiv = document.querySelector('.form');
const userDetails = document.querySelector('.user-details')
const user = JSON.parse(localStorage.getItem('user'));
const logOut = document.querySelector('#out');
const edit = document.querySelector('#edit');
const deletebtn = document.querySelector('#delete');
const save = document.querySelector('#save');
console.log(user);

if (!user) {
    window.location.href = '../index.html';
}

userDetails.innerHTML = `<p class="title">Welcome</p>
<p class="name">${user.username}</p>`;

homeButton.addEventListener('click', () => {
  contactsDiv.classList.add('visible');
  formDiv.classList.remove('visible');
  formDiv.style.display = 'none'; // Oculta el formulario
  contactsDiv.style.display = 'flex';
});

addButton.addEventListener('click', () => {
  contactsDiv.classList.remove('visible');
  formDiv.classList.add('visible');
  contactsDiv.style.display = 'none'; // Oculta la lista de contactos
  formDiv.style.display = 'flex';
});


menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        menuIcon.style.display = 'none';
        menuIconActive.style.display = 'inline-block';
    } else {
        menuIcon.style.display = 'inline-block';
        menuIconActive.style.display = 'none';
    }
});

liElementsWithSubMenu.forEach(li => {
  const subMenu = li.querySelector('.sub-menu');

  if (subMenu) {
    li.addEventListener('click', () => {
      if (subMenu.style.maxHeight === '0px') {
        subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
      } else {
        subMenu.style.maxHeight = '0px';
      }
    });
  }
});

liElements.forEach(li => {
  li.addEventListener('click', () => {
    liElements.forEach(item => {
      item.classList.remove('active');
    });

    li.classList.add('active');
  });
});

const NUMBER_REGEX = /^((412)|(212)|(414)|(424)|(416)|(426))[0-9]{7}$/;
const NAME_REGEX = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]{2,}$/;


const validar = (input, verification) => {

    const message = input.parentElement.children[2];

    if(!input.value){
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

let numberValidation1 = false;
let nameValidation1 = false;
let numberValidation = false;
let nameValidation = false;

inputName.addEventListener('input', e => {
    nameValidation = NAME_REGEX.test(inputName.value);
    validar(inputName, nameValidation);

    if (nameValidation && numberValidation) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
    }
});

inputNumber.addEventListener('input', e => {
    numberValidation = NUMBER_REGEX.test(inputNumber.value);
    validar(inputNumber, numberValidation);
    if (nameValidation && numberValidation) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
    }
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    const responseJSON = await fetch('http://localhost:3004/Contacs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: inputName.value, number: inputNumber.value, user: user.username}),
    });

    const response = await responseJSON.json();
    console.log(response);

    const contact = document.createElement('div');
    contact.innerHTML = ` <input id="name-edit" type="text" value="${response.name}" disabled>
    <input id="number-edit" type="text" value="${response.number}" disabled>
    <div class="buttons">
        <button id="edit">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>

        <button id="delete">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              
        </button>

        <button id="save" style="display: none;" disabled>
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              
        </button>`;

    contact.classList.add('contact');
    contact.setAttribute('id', parseInt(response.id));
    contactsDiv.append(contact);
    inputName.value = '';
    inputNumber.value = '';
    inputName.classList.remove('error');
    inputName.classList.remove('success');
    inputNumber.classList.remove('error');
    inputNumber.classList.remove('success');
    formBtn.disabled = true;
    formDiv.style.display = 'none'; // Oculta el formulario
    contactsDiv.style.display = 'flex';
    contactsDiv.classList.add('visible');
    formDiv.classList.remove('visible');
});


const getContacts = async () => {
    const response = await fetch('http://localhost:3004/Contacs', { method: 'GET' });
    const todos = await response.json();
    const userTodos = todos.filter(todo => todo.user === user.username);

    userTodos.forEach(todo => {
        const contact = document.createElement('div');
    contact.innerHTML = ` <input id="name-edit" type="text" value="${todo.name}" disabled>
    <input id="number-edit" type="text" value="${todo.number}" disabled>
    <div class="buttons">
        <button id="edit">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>

        <button id="delete">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              
        </button>

        <button id="save" style="display: none;" disabled>
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              
        </button>`;

    contact.classList.add('contact');
    contact.setAttribute('id', parseInt(todo.id));
    contactsDiv.append(contact);
    });
}

getContacts();

window.addEventListener('click', (e) => {
    // Verifica si el clic se realizó dentro de un contacto (cualquier elemento dentro del contacto)
    const contactElement = e.target.closest('.contact');

    if (contactElement) {
        // Obtiene el ID del contacto desde el atributo "id" del div "contact"
        const contactId = contactElement.getAttribute('id');

        // Verifica si el clic se realizó en un botón de "Delete" dentro del contacto
        if (
            (e.target.tagName === 'BUTTON' && e.target.id === 'delete') ||
            (e.target.parentElement.tagName === 'BUTTON' && e.target.parentElement.id === 'delete')
        ) {
            // Realiza la solicitud DELETE al servidor
            fetch(`http://localhost:3004/Contacs/${contactId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        // Eliminación exitosa, puedes realizar cualquier acción adicional necesaria
                        // Por ejemplo, puedes eliminar el contacto de la lista de contactos en la interfaz de usuario.
                        contactElement.remove(); // Elimina el elemento de la UI
                    } else {
                        console.error('No se pudo eliminar el contacto.'); // Maneja el error si la eliminación falla
                    }
                })
                .catch((error) => {
                    console.error('Error al eliminar el contacto:', error);
                });
        } else if (
            (e.target.tagName === 'BUTTON' && e.target.id === 'edit') ||
            (e.target.parentElement.tagName === 'BUTTON' && e.target.parentElement.id === 'edit')
        ) {
            // Habilita los campos de edición dentro del contacto
            const inputName = contactElement.querySelector('#name-edit');
            const inputNumber = contactElement.querySelector('#number-edit');
            inputName.removeAttribute('disabled');
            inputNumber.removeAttribute('disabled');

            // Muestra el botón "Guardar" y oculta "Editar" y "Eliminar" dentro del contacto
            const editButton = contactElement.querySelector('#edit');
            const deleteButton = contactElement.querySelector('#delete');
            const saveButton = contactElement.querySelector('#save');
            editButton.style.display = 'none';
            deleteButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
            const saveIcon = saveButton.querySelector('.svg');
            saveIcon.style.display = 'inline-block';

            // Habilita el botón "Guardar" solo cuando ambos campos no estén vacíos
            saveButton.disabled = !(inputName.value.trim() && inputNumber.value.trim());
        } else if (
            (e.target.tagName === 'BUTTON' && e.target.id === 'save') ||
            (e.target.parentElement.tagName === 'BUTTON' && e.target.parentElement.id === 'save')
        ) {
            // Obtén los valores de los campos de edición directamente desde e.target
            const newNameInput = contactElement.querySelector('#name-edit');
            const newNumberInput = contactElement.querySelector('#number-edit');

            const newName = newNameInput.value;
            const newNumber = newNumberInput.value;

            // Verifica si ambos campos no están vacíos
            if (newName.trim() !== '' && newNumber.trim() !== '') {
                // Realiza una solicitud PUT al servidor para actualizar los datos
                fetch(`http://localhost:3004/Contacs/${contactId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newName, number: newNumber }),
                })
                    .then((response) => {
                        if (response.ok) {
                            // Actualización exitosa, puedes realizar cualquier acción adicional necesaria
                            // Por ejemplo, puedes actualizar los campos de edición con los nuevos valores.
                            newNameInput.setAttribute('disabled', true);
                            newNumberInput.setAttribute('disabled', true);

                            // Oculta el botón "Guardar" y muestra el botón "Editar"
                            e.target.style.display = 'none'; // Oculta el botón "Guardar"
                            const editButton = contactElement.querySelector('#edit');
                            editButton.style.display = 'inline-block'; // Muestra el botón "Editar"

                            // Muestra el botón "Delete" del contacto
                            const deleteButton = contactElement.querySelector('#delete');
                            deleteButton.style.display = 'inline-block';
                        } else {
                            console.error('No se pudo actualizar el contacto.'); // Maneja el error si la actualización falla
                        }
                    })
                    .catch((error) => {
                        console.error('Error al actualizar el contacto:', error);
                    });
            } else {
                console.error('Ambos campos deben estar llenos para guardar.'); // Maneja el caso en el que uno o ambos campos están vacíos
            }

            // Deshabilita los campos de edición
            const inputName = contactElement.querySelector('#name-edit');
            const inputNumber = contactElement.querySelector('#number-edit');
            inputName.setAttribute('disabled', true);
            inputNumber.setAttribute('disabled', true);

            // Oculta el botón "Guardar" y muestra "Editar" y "Eliminar" dentro del contacto
            const editButton = contactElement.querySelector('#edit');
            const deleteButton = contactElement.querySelector('#delete');
            const saveButton = contactElement.querySelector('#save');
            editButton.style.display = 'inline-block';
            deleteButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
        }
    }
});










logOut.addEventListener('click', e =>{
    localStorage.removeItem('user');
    window.location.href = '../index.html';
});

function setSidebarActive() {
    const sidebar = document.querySelector('.sidebar');
    
    if (window.innerWidth < 768) {
        sidebar.classList.add('active');
    } else {
        sidebar.classList.remove('active');
    }
}

function setContentWidth() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    
    const isActive = sidebar.classList.contains('active');
    
    content.style.width = isActive ? '90%' : '80%';
}

function handleMutations(mutationsList, observer) {
    setContentWidth();
}

const observer = new MutationObserver(handleMutations);
const observerConfig = { attributes: true, attributeFilter: ['class'] };
observer.observe(sidebar, observerConfig);



window.addEventListener('load', setContentWidth);
window.addEventListener('load', setSidebarActive);
window.addEventListener('resize', setSidebarActive);