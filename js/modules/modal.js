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

export default modal;
export {showModal};
export {closeModal};
export {getZero};