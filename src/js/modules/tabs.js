

const tabs = (headerSelector, tabSelector, contentSelector, activeClass, displayStyle = 'block') => {
	const header = document.querySelector(headerSelector),
		tab = document.querySelectorAll(tabSelector),
		content = document.querySelectorAll(contentSelector);
		content.forEach(item => {
			item.classList.add('animate__animated', 'animate__fadeIn');
			item.style.setProperty('--animate-duration', '0.5s');
		});		
		function hideTabContent() {
			content.forEach(item => {
				item.style.display = 'none';
			});
			tab.forEach(item => {
				item.classList.remove(activeClass);
				item.classList.remove('animate__fadeIn');
			});
		}
		
		function showTabContent(i = 0) {
			content[i].style.display = displayStyle;
			tab[i].classList.add('animate__animated', 'animate__fadeIn');
			tab[i].style.setProperty('--animate-duration', '0.5s');
			tab[i].classList.add(activeClass);
		}

		hideTabContent();
		showTabContent();

		header.addEventListener('click', (e) => {
			const target = e.target;
			if (target) {
			// if(target.classList.contains(tabSelector.replace(/\./, "")) || target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) {
				tab.forEach((item, i) => {
					if (target.parentNode == item) {
						hideTabContent();
						showTabContent(i);
					}
				});
			// }
			}
		})
};

export default tabs;