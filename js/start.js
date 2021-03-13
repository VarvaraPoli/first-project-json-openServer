'use strict';
window.addEventListener('DOMContentLoaded', () => {
 const tabs = document.querySelectorAll('.tabheader__item'),
       tabsContent = document.querySelectorAll('.tabcontent'),
       tabsParent = document.querySelector('.tabheader__items');

 function hideTabContent() {
     tabsContent.forEach(item =>{
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
     });
     tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
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
   
   if(target && target.classList.contains('tabheader__item')){
     tabs.forEach((item, i) => {
       if(target == item){
        hideTabContent();
        shellTabConetnt(i);
       }
     });
   };
 });

//Timer

const deadline = '2021-03-08';

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

function getZero(num){
  if(num >= 0 && num < 10){
    return `0${num}`;
  } else {
    return num;
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
    days.textContent = getZero(t.days);
    hours.textContent = getZero(t.hours);
    minutes.textContent = getZero(t.minutes);
    seconds.textContent = getZero(t.seconds);
    if (t.total <= 0){
      clearInterval(timeInterval);
    }
  }
}
setClock('.time', deadline);

//Modal
 const modalButtons = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

  function showModal(){
    modal.classList.remove('hidden');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(appearModal);
  }

  modalButtons.forEach(item => {
    item.addEventListener('click', () =>{
      showModal();
    });
  });
  

  function closeModal(){
   modal.classList.remove('show');
   modal.classList.add('hidden');
   document.body.style.overflow = '';
  }
 

 modal.addEventListener('click', (e) => {
   if( e.target === modal || e.target.getAttribute('data-close') == '' ){
   closeModal();
   }
 });

 document.addEventListener('keydown', (e) => {
   if(e.code === 'Escape' && modal.classList.contains('show')){
     closeModal();
   }
 })

var appearModal = setTimeout(showModal, 6000);


 document.addEventListener('scroll', function end(){
 // if(document.body.clientHeight == document.documentElement.scrollTop + document.documentElement.clientHeight ){
  if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
   showModal();
   document.removeEventListener('scroll', end);
  }
 });

 /*
 // Class
 class MenuCard {
   constructor(src, alt, title, text, price,container, ...classes){
     this.src = src;
     this.alt = alt;
     this.title = title;
     this.text = text;
     this.price = price;
     this.classes = classes;
     this.container = document.querySelector(container);
     this.transfer = 27;
     this.changeToUAH();
   }
   changeToUAH(){
     this.price = +this.price * this.transfer;
   }
   render(){
    let div = document.createElement('div');
    
    if(this.classes.length === 0){
      this.element = 'menu__item';
      div.classList.add(this.element);
      
    } else {
      this.classes.forEach(className => div.classList.add(className));
    }
    
    div.innerHTML = `          
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>           
            `;
    this.container.append(div);
   }
 }
 */

/* 
const getResource = async (url) => {
  const res = await fetch(url);
  if(!res.ok){
   throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};
*/
axios.get('http://localhost:3000/menu').then(data => createCard(data));


/*
 getResource('http://localhost:3000/menu')
 .then(data =>{
   data.forEach(({img, altimg, title, descr, price}) => {
     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
   })
 })
*/

//getResource('http://localhost:3000/menu').then(data => createCard(data));

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

   //Forms -- устарело --
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  }
  
  forms.forEach(item => {
    bindPostData(item);
  });

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

     /*const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');
     */
      const formData = new FormData(form);
     
      /*
      //переводим в формат JSON
      const object = {};
      
      formData.forEach((value, key) => {
       object[key] = value;
      });
      */
      
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
      .then(response => {
         console.log(response);
        showThanksModal(message.success);
        statusMessage.remove();
        
      }).catch(()=> showThanksModal(message.failure)).finally(() => form.reset());

      /*
      request.send(json);
      request.addEventListener('load', () =>{
        if(request.status === 200){
         // console.log(request.response);
          showThanksModal(message.success);
          form.reset();
          statusMessage.remove(); 
        } else {
          showThanksModal(message.failure);
        }
      }); */

    });
  }

  function showThanksModal(message){
     const prevModalDialog = document.querySelector('.modal__dialog');
    
     prevModalDialog.classList.add('hide');

     showModal();// но уже открытo modal !?

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
       closeModal();
     }, 4000)
  }
 
  //Slider № 2
  const slides = document.querySelectorAll('.offer__slide'), 
        counter = document.querySelector('.offer__slider-counter'),
        buttonPrev = counter.querySelector('.offer__slider-prev'),
        buttonNext = counter.querySelector('.offer__slider-next'),
        current = counter.querySelector('#current'),
        total = counter.querySelector('#total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
      offset = 0;

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
    if(offset == 0){
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


  /* Slider №1
  const wrapper = document.querySelectorAll('.offer__slider-wrapper > div'), 
        counter = document.querySelector('.offer__slider-counter'),
        buttonPrev = counter.querySelector('.offer__slider-prev'),
        buttonNext = counter.querySelector('.offer__slider-next'),
        current = counter.querySelector('#current'),
        total = counter.querySelector('#total');

  function showWrapper(c){
    wrapper.forEach((item, i) => {
      item.classList.remove('show');
      item.classList.add('hide');
      
      if(i+1 == c){
        item.classList.remove('hide');  
        item.classList.add('show');
      }
    });
  }


  function setSlider (){
    let c = 1;
    showWrapper(c);
    current.textContent = getZero(c);
    total.textContent = getZero(wrapper.length);
    
    counter.addEventListener('click', (e) => {
      if( e.target && e.target == buttonPrev && c > 1){
        current.textContent = getZero(--c);
        
      };

      if( e.target && e.target == buttonNext && c < wrapper.length){  
        current.textContent = getZero(++c);
        
      };
      showWrapper(c);
    });
  }
  setSlider(); 
  */
 // Points
 const containerSliders = document.querySelector('.offer__slider');
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

 //Calc

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



});