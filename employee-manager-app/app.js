// Basic JS OOP using ES6 Classes
// Job class:

class Job {
	constructor(name, position, employee) {
		this.name = name;
		this.position = position;
		this.employee = employee;
	}
}

//UI class:

class UI {
	// Create addJobToList prototype:
	addJobToList(job) {
		//Grab list-employee ID and store it to list variable:
		const list = document.querySelector('#employee-list');

		//Create tr element to put in the new row variable:
		const row = document.createElement('tr');

		//Insert columns:
		row.innerHTML = `
			<td>${job.name}</td>
			<td>${job.position}</td>
			<td>${job.employee}</td>
			<td><a href="#" class="delete">x<a></td>
		`;

		// Append td into the list
		list.appendChild(row);

		list.setAttribute('border', '2');
	}

	////Create Error prototype method:
	showAlert(message, className) {
		//Create a div
		const div = document.createElement('div');

		//Add a class to the div:
		div.className = `alert ${className}`;

		//Add text to div:
		div.appendChild(document.createTextNode(message));

		//Insert the div in the DOM:
		//Grab container2:
		const container2 = document.querySelector('.container2');

		// get the form so we can put the alert before the form
		const form = document.querySelector('#job-form');

		//Insert alert
		container2.insertBefore(div, form);

		//22. Disappear the alert after 3 seconds using setTimeOut which is part of window object
		setTimeout(function () {
			document.querySelector('.alert').remove();
		}, 3000);
	}

	//Create delete job prototype:
	deleteJob(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}

	// Create clear fields prototype:
	clearFields() {
		document.querySelector('#name').value = '';
		document.querySelector('#position').value = '';
		document.querySelector('#employee').value = '';
	}
}

/******************************************************/
// Local Storage Class:

class Store {
	//fetching Jobs from local store:
	static getJobs() {
		let jobs;
		if (localStorage.getItem('jobs') === null) {
			jobs = [];
		} else {
			jobs = JSON.parse(localStorage.getItem('jobs'));
		}
		return jobs;
	}

	//Display Jobs in the UI:
	static displayJobs() {
		// Get getJobs() method:
		const jobs = Store.getJobs();

		//Loop through books with forEach() method:
		jobs.forEach((job) => {
			const ui = new UI();
			ui.addJobToList(job);
		});
	}

	//2. Add jobs to the local store:
	static addJob(job) {
		const jobs = Store.getJobs();
		jobs.push(job);
		localStorage.setItem('jobs', JSON.stringify(jobs));
	}

	//Remove books from local storage:
	static removeJobs(employee) {
		const jobs = Store.getJobs();
		jobs.forEach((job, index) => {
			if (job.employee === job) {
				jobs.splice(index, 1);
			}
		});
		localStorage.setItem('jobs', JSON.stringify(jobs));
	}
}

/******************************************************/
// DOM load Event:
document.addEventListener('DOMContentLoaded', Store.displayJobs);

/*****************************************************/

//Event Listener for add employee:

document.getElementById('job-form').addEventListener('submit', function (e) {
	//Get form fields
	const name = document.querySelector('#name').value,
		position = document.querySelector('#position').value,
		employee = document.querySelector('#employee').value;

	//5. Once we submit the form, we need to instantiate the job object/constructor
	const job = new Job(name, position, employee);
	// Instantiate UI
	const ui = new UI();

	//Validate the form submission:
	if (name === '' || position === '' || employee === '') {
		//Error alert
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		//Add job to the list and pass in that job object
		ui.addJobToList(job);

		//Add to the local store:
		Store.addJob(job);

		// 23. When we add the job, we want to show the success alert:
		ui.showAlert('Employee Added!', 'success');
		//step 13
		ui.clearFields();
	}

	// Add job to the list and pass in that job object
	// Go up there and create prototype under the UI function
	// ui.addJobToList(job);

	//prevent default:
	e.preventDefault();
});

// Event listener for delete(Event Delegation):

document
	.querySelector('#employee-list')
	.addEventListener('click', function (e) {
		//Instantiate UI
		const ui = new UI();

		//delete job to the list and pass in that e target
		ui.deleteJob(e.target);

		//Remove from Local Storage:
		Store.removeJobs(e.target.parentElement.previousElementSibling.textContent);

		//27. Show Message:
		ui.showAlert('Job Removed!', 'success');

		// Make sure to Prevent the default
		e.preventDefault();
	});

