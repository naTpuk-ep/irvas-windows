import closeModals from "./closeModals";
import culcScroll from "./culcScroll"

const modals = () => {

	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = 'true', requiredInputsSelector) {   //closeClickOverlay если true, нажатие на подложку закрывает модальное окно 
		
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]'),
			requiredInputs = document.querySelectorAll(requiredInputsSelector);

		trigger.forEach(item => {                       
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();                       //отменяет стандартные действия, если они есть
				}
				
					modal.removeEventListener('click', closeModals, false);
				

				if (requiredInputs.length > 0) {            // проверка на заполнение Inputs
					let permitlength = 0;
					requiredInputs.forEach(item => {
						switch(item.nodeName) {                 // switch для дальнейшего функционала
							case 'INPUT' :
								if (item.getAttribute('type') === 'checkbox') {
									if (item.checked){
										openWindow();
									}
								} else if (item.value && item.value != '') {
									permitlength += 1;
									if (permitlength == requiredInputs.length) {
										openWindow();
									}
								}
								break;
						}
					});
				} else {
					openWindow();
				}
			});
		});

		close.addEventListener('click', () => {         //функция закрытия модального окна на кнопку close
			closeModals();
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				closeModals();
			}
		});

		function openWindow () {                      //функция открытия модального окна
			windows.forEach(item => {                   //закрывает все модальные окна
				item.style.display = 'none';
			});
			modal.style.display = "block";              //открывает нужное модальное окно
			// document.body.style.overflow = "hidden";    //отменяет прокрутку всей страницы, когда окно открыто
			document.body.classList.add('modal-open');
			// document.body.style.marginRight = '20px';
			document.body.style.marginRight = `${culcScroll()}px`;
		}
	}

	function showModalByTime(selector, time) {
		setTimeout(function() {
			document.querySelector(selector).style.display = "block";
			document.body.classList.add('modal-open');
		}, time);
	}

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, '[data-required].form-control');
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false, '[data-required].checkbox');

	showModalByTime('.popup[data-modal]', 60000);

};

export default modals;
