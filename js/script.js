'use strict';

import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import form from './modules/form';
import slider from './modules/slider';
import timer from './modules/timer';
import modal from './modules/modal';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  var appearModal = setTimeout(() => {showModal('.modal', appearModal) }, 6000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  calc();
  cards();
  form('form', appearModal);
  slider({
    container: '.offer__slider', 
    slider: '.offer__slide', 
    nextArrow: '.offer__slider-next', 
    prevArrow: '.offer__slider-prev', 
    totalCounter: '#total', 
    currentCounter: '#current', 
    wrapper: '.offer__slider-wrapper', 
    field: '.offer__slider-inner'

  });
  timer('.timer', '2021-06-01');
  modal('[data-modal]', '.modal', appearModal);
});

