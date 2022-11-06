new WOW().init()

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'

new Swiper('.swiper-container', {
    sliderPerView: 1,

    grabCursor: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
})


const CartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

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


const cardsRestaurant = document.querySelector('.cards-restaurant');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const descriptionRestaurant = document.querySelector('.section-heading');

const getData = async function(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error (`Ошибка по адресу ${url}, 
        статус ошибки ${response.status}!`);
    }

    return await response.json();
}



function ToggleModal() {
    modal.classList.toggle("is-open");
}

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


function createCardRestaurant(restaurant) {
    const {image, kitchen, name, price, stars, products, 
        time_of_delivery: timeOfDelivery, pruf} = restaurant;

        const card = `
        <a class="card card-restaurant" data-products="${products}" data-pruf="${pruf}">
            <img src="${image}" alt="image" class="card-image" />
            <div class="card-text"> 
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag tag">${timeOfDelivery} мин</span>
                </div>
                <div class="card-info">
                    <div class="rating"> 
                        <img src="images/rating.png" alt="rating" class="rating-star"> ${stars}
                    </div>
                    <div class="price">От ${price} грн</div> 
                    <div class="category">${kitchen}</div>
                </div>
            </div>
        </a>
    `;

    cardsRestaurant.insertAdjacentHTML('beforeend', card);
}

function createCartGoods(goods) {
    const { description, image, name, price } = goods;

    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
        <img src="${image}" alt="image" class="card-image">
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3> 
            </div>
            <div class="card-info">
                <div class="ingredients">${description}</div>
            </div>
            <div class="card-buttons">
                <button class="button button-prim">
                    <span class="button-card-text">В корзину</span>
                    <img src="images/Vector.png" alt="cart" class="button-card-image">
                </button>
                <strong class="card-price-bold">${price} ₽</strong>
            </div>
        </div>
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
}

function createDescriptionRestaurant(desc) {
    const { name, stars, price, kitchen } = desc;

    const section = document.createElement('div');
    section.className = 'section';
    section.insertAdjacentHTML('beforeend',`
        <h2 class="section-title">${name}</h2>
        <div class="card-info">
            <div class="rating">
                <img src="images/rating.png" alt="">${stars}</div>
            <div class="price">От ${price} грн</div>
            <div class="category">${kitchen}</div>
        </div>
    `);

    descriptionRestaurant.insertAdjacentElement('beforeend', section);
}




function openGoods(event) {
    const target = event.target;
    if(login) {
        const restaurant = target.closest('.card-restaurant');
        if (restaurant) {
            console.log(restaurant.dataset.products);
            console.log(restaurant.dataset.pruf);

            cardsMenu.textContent='';
            descriptionRestaurant.textContent='';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            getData(`./db/${restaurant.dataset.products}`).then(function(data){
                data.forEach(createCartGoods);
                
            });
            getData(`./db/${restaurant.dataset.pruf}`).then(function(data){
                data.forEach(createDescriptionRestaurant);
            });
        }
    } else {
        LogToggleModal();
    }
}

function init() {
    getData('./db/partners.json').then(function(data){
        data.forEach(createCardRestaurant);
    });

    CartButton.addEventListener('click', ToggleModal);
    close.addEventListener('click', ToggleModal);
    
    cardsRestaurant.addEventListener('click', openGoods);
    logo.addEventListener('click', function() {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    })
}

init();