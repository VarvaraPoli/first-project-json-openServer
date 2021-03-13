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
export default slider;
