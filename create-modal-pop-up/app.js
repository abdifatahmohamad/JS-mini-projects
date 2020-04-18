const openBtn = document.querySelector('.openBtn'),
	modalContainer = document.querySelector('.modal-container'),
	closeIcon = document.querySelector('.close-icon');

openBtn.addEventListener('click', () => {
	modalContainer.classList.add('show');
});
closeIcon.addEventListener('click', () => {
	modalContainer.classList.remove('show');
});
window.addEventListener('click', (e) => {
	if (e.target === modalContainer) {
		modalContainer.classList.remove('show');
	}
});
