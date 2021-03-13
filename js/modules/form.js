import {closeModal, showModal} from './modal';
import {postData} from '../services/services';

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

      postData('http://localhost:3000/requests', json)
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

     showModal('.modal', appearModal);// но уже открытo modal !?

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
       closeModal('.modal');
     }, 4000)
  }
}

//module.exports = form;
export default form;