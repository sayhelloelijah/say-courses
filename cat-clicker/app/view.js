import { controller } from './app';

export const view = {
	init: function() {
		this.catList = document.querySelector('.cat-list');
		this.catImage = document.querySelector('.cat-image-container');
		view.render();
	},

	renderCatList: function() {
		let template = '';
		controller.getCats().forEach(function(cat) {
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

	addListClickEvents: function() {
		let catListItems = document.querySelectorAll('.cat-list-item');
		let template = '';
		catListItems.forEach(function(item) {
			item.addEventListener('click', function() {
				view.renderCatImage(parseInt(item.dataset.id));
				view.addImageClickEvent();
			});
		});
	},

	addImageClickEvent: function() {
		this.catImage.querySelector('img').addEventListener('click', function() {
			controller.getCatById(this.dataset.id).forEach(function(cat) {
				controller.incrementCounter(cat.id);
				view.render(cat.id);
			});
		});
	},

	render: function(id) {
		view.renderCatList();
		view.renderCatImage(id);
		view.addListClickEvents();
		view.addImageClickEvent();
	}
};