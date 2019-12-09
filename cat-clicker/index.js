(function(){
	
	let modal = {
		init: function() {
			/**
			 * @type {object}  object of cats, name, image, clicks
			 */
			let data = [{'id': 0, 'name': 'Tiger','image': 'https://placekitten.com/g/600/350','clicks': 0},{'id': 1, 'name': 'Shadow','image': 'https://placekitten.com/650/350','clicks': 0},{'id': 2, 'name': 'Spike','image': 'https://placekitten.com/700/350','clicks': 0},{'id': 3, 'name': 'Daisy','image': 'https://placekitten.com/620/350','clicks': 0},{'id': 4, 'name': 'Sassy','image': 'https://placekitten.com/720/350','clicks': 0},{'id': 5, 'name': 'Jasmine','image': 'https://placekitten.com/g/790/350','clicks': 0}];
			if(!localStorage.cats) {
				localStorage.setItem('cats', JSON.stringify(data));
			}
		},
		
		updateData: function(data) {
			localStorage.setItem('cats', JSON.stringify(data));
		},
		
		getCats: function() {
			return JSON.parse(localStorage.getItem('cats'));
		}
	};
	
	let controller = {
		getCats: function() {
			return modal.getCats();
		},
		
		getCatById: function(id) {
			return modal.getCats().filter(cat => parseInt(cat.id) == id);
		},
		
		incrementCounter: function(id) {
			let data = modal.getCats();
			data[id].clicks = controller.getCatById(id)[0].clicks += 1;
			modal.updateData(data);
		},
		
		init: function() {
			modal.init();
			view.init();
		}
	};
	
	let view = {
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
	
	controller.init();
})();
