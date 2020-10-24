const btnContainer = document.querySelector('#filter-btn');

// Get all buttons with class="btn" inside the container
const btns = btnContainer.querySelectorAll('.btn');

// Loop through the buttons and add the active class to the current/clicked button 
for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener('click', function () {
		const current = document.getElementsByClassName('active');
		current[0].className = current[0].className.replace(' active', '');
		this.className += ' active';
	});
}



