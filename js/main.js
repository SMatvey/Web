const CartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

CartButton.addEventListener('click', ToggleModal);
close.addEventListener('click', ToggleModal);

function ToggleModal() {
    modal.classList.toggle("is-open")
}

new WOW().init()


const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('gloDelivery');
let password = localStorage.getItem('gloDelivery');


const modalProb = document.querySelector('.modal-prob');
const closeProb = document.querySelector(".close-prob");

function ProbToggleModal() {
    modalProb.classList.toggle("is-open");
}


function LogToggleModal() {
    modalAuth.classList.toggle("is-open");
    loginInput.style.borderColor='';
    passwordInput.style.borderColor='';
    if (modalAuth.classList.contains("is-open")) {
        document.body.style.cssText = `
          position: relative;
          overflow: hidden;
          height:100vh;
          `;
      } else {
        document.body.style.cssText = ``;
      }
}

function autorized(){
    console.log('Da');

    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        userName.textContent = login;
        buttonOut.removeEventListener('click', logOut);

        checkAuth();
    }

    userName.textContent = login;

    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';
    buttonOut.addEventListener('click', logOut);
}

function notAutorized(){
    console.log('Net');

    function logIn(event){
        event.preventDefault();
        login = loginInput.value;
        password = passwordInput.value;
        localStorage.setItem('gloDelivery', login);

        if ((login) && (password)) {
            LogToggleModal();
            buttonAuth.removeEventListener('click', LogToggleModal);
            closeAuth.removeEventListener('click', LogToggleModal);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset();

            checkAuth();
        } 
        else {
            ProbToggleModal();
            closeProb.addEventListener('click', ProbToggleModal);

            loginInput.style.borderColor='#ff0000';
            loginInput.value = '';
            passwordInput.style.borderColor='#ff0000';
            passwordInput.value = '';
        }
    }

    buttonAuth.addEventListener('click', LogToggleModal);
    closeAuth.addEventListener('click', LogToggleModal);
    logInForm.addEventListener('submit', logIn);

    modalAuth.addEventListener('click', function(event) {
        if (event.target.classList.contains('is-open')) {
            LogToggleModal();
        }
    });

}

function checkAuth(){
    if (login) {
        autorized();
    } else {
        notAutorized();
    }
}

checkAuth();