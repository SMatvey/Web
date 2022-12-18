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
const inputSearch = document.querySelector('.input-search')


const cart = [];

const cartModal = document.querySelector('.modal-body-cart')
const cartClear = document.querySelector('.button-clear')
const cartPrice = document.querySelector('.modal-pricetag')





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
    if (modal.classList.contains("is-open")) {
        document.body.style.cssText = `
          `;
      } else {
        document.body.style.cssText = ``;
      }
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
    const { description, image, name, price, id } = goods;

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
                <button class="button button-prim button-add" id = ${id}>
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

function addToCart(event) {
    const target = event.target;
    const buttonAddToCart = target.closest('.button-add')

    if (buttonAddToCart) {
        const card = target.closest('.card')
        const title = card.querySelector('.card-title-reg').textContent
        const cost = card.querySelector('.card-price-bold').textContent
        const id = buttonAddToCart.id;

        const food = cart.find(function (item) {
            return item.id === id;
        })
        if (food) {
            food.count += 1;
        } else {
            cart.push({
                id: id,
                title: title,
                cost: cost,
                count: 1
            });
        }

        console.log(cart);
    }
}

function renderCart() {
    cartModal.textContent = '';

    cart.forEach(function({ id, title, cost, count }) {
        const itemCart = `
            <div class="food-row">
                <span class="food-name">${title}</span>
                <strong class="food-price">${cost}грн</strong>
                <div class="food-counter">
                    <button class="counter-button minus" data-id=${id}>-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button plus" data-id=${id}>+</button>
                </div>
            </div>`;
            cartModal.insertAdjacentHTML('beforeend', itemCart);
    });
    const totalPrice = cart.reduce(function (result, item) {
        return result + (parseFloat(item.cost) * item.count);
    }, 0)
    cartPrice.textContent = totalPrice + ' грн';
}

function changeCount(event) {
    const target = event.target;

    if (target.classList.contains('counter-button')) {
        const food = cart.find(function(item) {
            return item.id === target.dataset.id
        })
        if (target.classList.contains('minus')) {
            food.count--;
            if (food.count === 0) {
                cart.splice(cart.indexOf(food), 1);
            }
        }
        if (target.classList.contains('plus')) food.count++;
        renderCart();
    }
}

function init() {
    getData('./db/partners.json').then(function(data){
        data.forEach(createCardRestaurant);
    });

    CartButton.addEventListener('click', function(){
        renderCart();
        ToggleModal();
    });
    close.addEventListener('click', ToggleModal);
    cardsMenu.addEventListener('click', addToCart);
    cartModal.addEventListener('click', changeCount);
    cartClear.addEventListener('click', function () {
        cart.length = 0;
        renderCart();
    });

    cardsRestaurant.addEventListener('click', openGoods);
    logo.addEventListener('click', function() {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    })

    inputSearch.addEventListener('keypress', (event) => {
        if (event.charCode === 13) {
            const value = event.target.value;
            if (!value) {
                return;
            }

            getData('./db/partners.json')
                .then(function(data) {
                    const linksProducts = data.map(function(partner) {
                        return partner.products;
                    });
                    return linksProducts;
                })
                .then(function(linksProducts) {
                    console.log(linksProducts)
                    linksProducts.forEach(function(link) {
                        console.log(link)
                        
                        cardsMenu.textContent='';
                        descriptionRestaurant.textContent='';
                        containerPromo.classList.add('hide');
                        restaurants.classList.add('hide');
                        menu.classList.remove('hide');

                        const section = document.createElement('div');
                        section.className = 'section';
                        section.insertAdjacentHTML('beforeend',`
                            <h2 class="section-title">Результат поиска</h2>
                            <div class="card-info">
                                <div class="category">Разная кухня</div>
                            </div>
                        `);
                        descriptionRestaurant.insertAdjacentElement('beforeend', section);

                        getData(`./db/${link}`)
                            .then(function(data) {
                                const resultSearch = data.filter(function (item) {
                                    const name = item.name.toLowerCase();
                                    return name.includes(value.toLowerCase());
                                })
                                resultSearch.forEach(createCartGoods);
                            })
                    })


                })
            event.target.value = "";
        }
    })
}




init();