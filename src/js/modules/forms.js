import checkNumInputs from "./checkNumInputs";
import closeModals from "./closeModals";

const forms = (state) => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		// windows = document.querySelectorAll('[data-modal]');
		formWindow = document.querySelector('.popup_calc_end'),
		endForm = document.querySelector('.popup_calc_end form');
	 endForm.onclick = function (e) {
		 e.stopPropagation();
	 }

		checkNumInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Мы скоро с вами свяжемся',
		failure: 'Ошибка'
	};

	const postData = async (url, data) => {      // async говорит, что функции будут выполняться асинхронно, не сразу
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {               // в данном случае await, по получению ответа от сервера
			method: 'POST',
			body: data
		});
		 return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	}

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);
			if (item.getAttribute('data-calc') === "end"){
				for (let key in state) {
					formData.append(key, state[key]);     //добавляем в formData переменные из state
					if (key != "type" && key != "form" && key != "profile" ){
						delete state[key];
					}
				}
			}

			// const closeForm = () => {
				
			// 		closeModals();
			// 		clearTimeout(timeOut);
			
			// }
			

			postData('assets/server.php', formData)
				.then(res => {
					console.log(res);
					statusMessage.textContent = message.success;
					let timeOut = setTimeout( () => {
						closeModals();
						formWindow.removeEventListener('click', closeModals, false);
					}, 3000);
					formWindow.addEventListener('click', closeModals, false);    
					formWindow.addEventListener('click', (e) => {
						if (e.target === formWindow) {
							clearTimeout(timeOut);
						}
					});
					// windows.forEach(modal => {
					// 	modal.addEventListener('click', closeModals);
					// 	modal.addEventListener('click', () => {
					// 			// closeModals();
					// 			clearTimeout(timeOut);
					// 	});
					// });
				})
				.catch(() => statusMessage.textContent = message.failure)
				.finally(() => {
					clearInputs();
					setTimeout( () => {
						statusMessage.remove();
					}, 3000);
				});
		});
	});
};

export default forms;