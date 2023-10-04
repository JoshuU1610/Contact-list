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


// Funcion creada para validar que lo que esta dentro del input este bien puesto
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

// Variables para la validacion
let numberValidation1 = false;
let nameValidation1 = false;

// Evento donde se llama al input del nombre 
inputName.addEventListener('input', e => {
    // console.log(e.target.value);
    nameValidation1 = NAME_REGEX.test(inputName.value);
    validar(inputName, nameValidation1);

    if (nameValidation1 && numberValidation1) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
    }
});

// Evento donde se llama al input del numero 
inputNumber.addEventListener('input', e => {
    // console.log(e.target.value);
    numberValidation1 = NUMBER_REGEX.test(inputNumber.value);
    validar(inputNumber, numberValidation1);
    if (nameValidation1 && numberValidation1) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
    }
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