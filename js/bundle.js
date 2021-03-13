/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
 const result = document.querySelector('.calculating__result span');
 let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
  sex = localStorage.getItem('sex');
} else {
  sex = 'female';
  localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
  ratio = localStorage.getItem('ratio');
} else {
  ratio = 1.375;
  localStorage.setItem('ratio', 1.375);
}

 function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);

        if (elem.getAttribute('id') == localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
 }

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


 function calcTotal(){
   if(!sex || !height || !weight || !age || !ratio){
     result.textContent = '.....';
     return;
   };

   if(sex === 'female'){
     result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
   } else {
    result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
   };
   console.log('adf');
 }

 calcTotal();

 function getStaticInformation(selector, activeClass){
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(elem =>{
      elem.addEventListener('click', (e) => {
        if(e.target.getAttribute('data-ratio')){
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        };

        elements.forEach( elem =>{
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);
        calcTotal();
      });

    });
    
 }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDinamicInformation(selector){
    const input = document.querySelector(selector);

    input.addEventListener('input', ()=>{

      if(input.value.match(/\D/)){
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch(input.getAttribute('id')){
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDinamicInformation('#height');
  getDinamicInformation('#weight');
  getDinamicInformation('#age');
}

//module.exports = calc;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(){

axios.get('http://localhost:3000/menu').then(data => createCard(data));

  function createCard(data, hryvniaRate = 27){
    data.data.forEach(({img, altimg, title, descr, price}) => {

      let element = document.createElement('div');
      element.classList.add('menu__item');   
    
      element.innerHTML = `          
                    <img src=${img} alt=${altimg}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price * hryvniaRate}</span> грн/день</div>
                    </div>           
            `;
      document.querySelector('.menu .container').append(element);
    });
 } 

}

//module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelecror, appearModal){
  const forms = document.querySelectorAll(formSelecror);
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  }
  
  forms.forEach(item => {
    bindPostData(item);
  });


  function bindPostData(form){
    form.addEventListener('submit', (e) =>{
      e.preventDefault();

      //будет работать после отправки, если долго грузит и пока не  обновляет в showThanksModal()
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
         display:block;
         margin: auto;
      `;
    
     // вставит сообщение после формы, вместо  form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);

     
      const formData = new FormData(form);
     
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
      .then(response => {
         console.log(response);
        showThanksModal(message.success);
        statusMessage.remove();
        
      }).catch(()=> showThanksModal(message.failure)).finally(() => form.reset());

    });
  }

  function showThanksModal(message){
     const prevModalDialog = document.querySelector('.modal__dialog');
    
     prevModalDialog.classList.add('hide');

     (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', appearModal);// но уже открытo modal !?

     const thanksModal = document.createElement('div');
     thanksModal.classList.add('modal__dialog');
     thanksModal.innerHTML = `
          <div class='modal__content'>
            <div class='modal__close' data-close>x</div>
            <div class='modal__title'>${message}</div>
          </div>     
     `;

     document.querySelector('.modal').append(thanksModal);
     
     setTimeout(() => {
       thanksModal.remove();
       prevModalDialog.classList.add('show');
       prevModalDialog.classList.remove('hide');
       (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
     }, 4000)
  }
}

//module.exports = form;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function showModal(modalSelector, appearModal){
 const modal = document.querySelector(modalSelector);

  modal.classList.remove('hidden');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  if(appearModal){
    clearInterval(appearModal);
  }
}

function closeModal(modalSelector){
  const modal = document.querySelector(modalSelector);

  modal.classList.remove('show');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
 }

function getZero(num){
  if(num >= 0 && num < 10){
    return `0${num}`;
  } else {
    return num;
  }
}

function modal(triggerSelector, modalSelector, appearModal){
  //Modal
   const modalButtons = document.querySelectorAll(triggerSelector),
         modal = document.querySelector(modalSelector);
  
    modalButtons.forEach(item => {
      item.addEventListener('click', () =>{
        showModal(modalSelector, appearModal);
      });
    });
     
   modal.addEventListener('click', (e) => {
     if( e.target === modal || e.target.getAttribute('data-close') == '' ){
     closeModal(modalSelector);
     }
   });
  
   document.addEventListener('keydown', (e) => {
     if(e.code === 'Escape' && modal.classList.contains('show')){
       closeModal(modalSelector);
     }
   });

   
   document.addEventListener('scroll', function end(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
     showModal(modalSelector, appearModal);
     document.removeEventListener('scroll', end);
    }
   });
 }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slider, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
  const slides = document.querySelectorAll(slider), 
        containerSliders = document.querySelector(container),
        buttonPrev = document.querySelector(prevArrow),
        buttonNext = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
      offset = 0;

  function getZero(num){
     if(num >= 0 && num < 10){
       return `0${num}`;
    } else {
      return num;
    }
  }

  total.textContent = getZero(slides.length);
  current.textContent = getZero(slideIndex);
  

  slidesField.style.width = 100 * slides.length + '%';
  slides.forEach(slide => {
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slidesWrapper.style.width = width;
  });
  
  function  getWidth (str){
    return (+str.replace(/[^0-9.]/g, ''));
  }

  buttonNext.addEventListener('click', () => {
    if(offset == getWidth(width) * (slides.length - 1)){
      offset = 0;
    } else {
      offset += getWidth(width);
     }
    
    slidesField.style.transform = `translateX(${-offset}px)`;

    if(slideIndex == slides.length){
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    dots.forEach((d) => d.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = '1';
    
    current.textContent = getZero(slideIndex);
  });


  buttonPrev.addEventListener('click', () => {
    if(offset <= 0){
      offset = getWidth(width) * (slides.length - 1);
    } else {
      offset -= getWidth(width);
    }
    slidesField.style.transform = `translateX(${-offset}px)`;

    if(slideIndex == 1){
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
   
    dots.forEach((d) => d.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = '1';
    current.textContent = getZero(slideIndex);
  });


 
  containerSliders.style.position = 'relative';
 
  let pointContainer = document.createElement('ol');
  pointContainer.classList.add('carousel-indicators');
  containerSliders.append(pointContainer);
 
  var dots = []; 
 
  slides.forEach((item, i) => {
   let dot = document.createElement('li');
   dot.classList.add('dot');
   pointContainer.append(dot);
   dots.push(dot);
   
   dots[0].style.opacity = '1';
 
 
   dot.addEventListener('click', () => {
     offset = getWidth(width) * i;
 
     slidesField.style.transform = `translateX(${-offset}px)`;
     slideIndex = i + 1;
     dots.forEach((d) => d.style.opacity = '0.5');
     dot.style.opacity = '1';
     
     current.textContent = getZero(slideIndex);
   })
 
  });   
}

//module.exports = slider;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
  const tabs = document.querySelectorAll(tabsSelector),
  tabsContent = document.querySelectorAll(tabsContentSelector),
  tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(item =>{
    item.classList.add('hide');
    item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
    }

    function shellTabConetnt(i = 0){
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    shellTabConetnt();

    tabsParent.addEventListener('click', (event) =>{
    const target = event.target;

    if(target && target.classList.contains(tabsSelector.slice(1))){
      tabs.forEach((item, i) => {
        if(target == item){
        hideTabContent();
        shellTabConetnt(i);
        }
      });
     }
    });
}


//module.exports = tabs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function timer(id, deadline ){
 
  function getTimeRemaining (endtime){
   const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
         hours = Math.floor(t / (1000 * 60 * 60 ) % 24),
         minutes = Math.floor((t / 1000 / 60) % 60),
         seconds = Math.floor((t / 1000) % 60);
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
  }
  
  
  function setClock (selector, endtime){
   const timer = document.querySelector(selector),
         days = document.querySelector('#days'),
         hours = document.querySelector('#hours'),
         minutes = document.querySelector('#minutes'),
         seconds = document.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);
  
    //чтобы не мигала верстка из-за setInterval 
    updateClock ();
  
    function updateClock (){
      const t = getTimeRemaining(endtime);
      days.textContent = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.getZero)(t.days);
      hours.textContent = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.getZero)(t.hours);
      minutes.textContent = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.getZero)(t.minutes);
      seconds.textContent = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.getZero)(t.seconds);
      if (t.total <= 0){
        clearInterval(timeInterval);
      }
    }
  }
  setClock(id, deadline);

}

//module.exports = timer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  let res = await fetch(url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: data
  });

  return await res.json();
};

    
/*
async function getResource (url) => {
  const res = await fetch(url);
  if(!res.ok){
   throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};  
*/


//export {getResource};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");











window.addEventListener('DOMContentLoaded', () => {
  var appearModal = setTimeout(() => {(0,_modules_modal__WEBPACK_IMPORTED_MODULE_6__.showModal)('.modal', appearModal) }, 6000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__.default)('form', appearModal);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)({
    container: '.offer__slider', 
    slider: '.offer__slide', 
    nextArrow: '.offer__slider-next', 
    prevArrow: '.offer__slider-prev', 
    totalCounter: '#total', 
    currentCounter: '#current', 
    wrapper: '.offer__slider-wrapper', 
    field: '.offer__slider-inner'

  });
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__.default)('.timer', '2021-06-01');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_6__.default)('[data-modal]', '.modal', appearModal);
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map