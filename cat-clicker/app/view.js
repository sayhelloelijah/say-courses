import { controller } from './controller.js';

export const view = {
	init: function() {
		this.catList = document.querySelector('.cat-list');
		this.catImage = document.querySelector('.cat-image-container');
		this.adminToggle = document.querySelector('.admin-toggle');
		this.adminCancel = document.querySelector('.admin-cancel');
		this.adminSubmit = document.querySelector('.admin-submit');
		this.admin = document.querySelector('.admin-form');
		this.render();
	},

	renderCatList: function() {
		let template = '';
		controller.getAllCats().forEach(function(cat) {
			template += `<li class="cat-list-item" data-id="${cat.id}">${cat.name}</li>`;
		});
		this.catList.innerHTML = template;
	},

	renderCatImage: function(id = 0) {
		let template = '';
		controller.getCatById(id).forEach(function(cat) {
			template = `
				<figure>
					<h2>${cat.name}</h2>
					<img class="cat-image" src="${cat.image}" data-id="${cat.id}" alt="Cat Image">
					<figcaption>
						<p>Cat Image Clicks: <span class="click-count">${cat.clicks}</span></p>
					</figcaption>
				</figure>
			`;
		});
		this.catImage.innerHTML = template;
	},
	
	renderAdminForm: function() {
		let that = this;
		this.adminToggle.addEventListener('click', function() {
			let cat = controller.getCatById(that.catImage.querySelector('.cat-image').dataset.id);
			that.admin.dataset.id = cat[0].id;
			that.admin.querySelector('input[name=name]').value = cat[0].name;
			that.admin.querySelector('input[name=image-url]').value = cat[0].image;
			that.admin.querySelector('input[name=clicks]').value = cat[0].clicks;
			that.showForm();
		});

		this.adminSubmit.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			that.submitAdminForm(that.catImage.querySelector('.cat-image').dataset.id);
			that.hideForm();
			that.renderCatList();
			that.addListClickEvents();
			that.renderCatImage(that.catImage.querySelector('.cat-image').dataset.id);
		});

		this.adminCancel.addEventListener('click', function() {
			that.hideForm();
		});
	},
	
	submitAdminForm: function(id) {
		let data = controller.getAllCats();
		data[id].name = this.admin.querySelector('input[name=name]').value;
		data[id].image = this.admin.querySelector('input[name=image-url]').value;
		data[id].clicks = parseInt( this.admin.querySelector('input[name=clicks]').value);
		controller.save(data);
	},
	
	showForm: function() {
		this.admin.style.display = 'flex';
	},

	hideForm: function() {
		this.admin.style.display = 'none';
	},

	addListClickEvents: function() {
		let catListItems = document.querySelectorAll('.cat-list-item'), template = '', that = this;
		catListItems.forEach(function(item) {
			item.addEventListener('click', function() {
				that.renderCatImage(parseInt(item.dataset.id));
				that.addImageClickEvent();
			});
		});
	},

	addImageClickEvent: function() {
		let that = this;
		this.catImage.querySelector('img').addEventListener('click', function() {
			controller.getCatById(this.dataset.id).forEach(function(cat) {
				controller.incrementCounter(cat.id);
				that.render(cat.id);
			});
		});
	},

	render: function(id) {
		this.renderCatList();
		this.renderCatImage(id);
		this.addListClickEvents();
		this.addImageClickEvent();
		this.renderAdminForm();
	}
};