function culcScroll () {
	let div = document.createElement('div');
	div.style.width = '50px';
	div.style.height = '50px';
	div.style.overflowY = 'scroll';
	div.style.visibility = 'hidden';

	document.body.appendChild(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;  // вычисление длины скрола (полная ширина экрана - ширина без скролла)
	div.remove();

	return scrollWidth;
}

export default culcScroll;