
function closeModals ()  {
	// event.stopPropagation();
	const windows = document.querySelectorAll('[data-modal]');
	windows.forEach(item => {
		item.style.display = 'none';               //закрывает все модальные окна
	});
	// modal.style.display = "none";
	// document.body.style.overflow = "";            //разрешает прокрутку страницы
	document.body.classList.remove('modal-open');
	document.body.style.marginRight = '0px';
}

export default closeModals;