/**
 * @type {object}  object of cats, name, image, clicks
 */
let data = [{'id': 0, 'name': 'Tiger','image': 'https://placekitten.com/g/750/350','clicks': 0},{'id': 1, 'name': 'Shadow','image': 'https://placekitten.com/750/350','clicks': 0},{'id': 2, 'name': 'Spike','image': 'https://placekitten.com/750/200','clicks': 0},{'id': 3, 'name': 'Daisy','image': 'https://placekitten.com/750/540','clicks': 0},{'id': 4, 'name': 'Sassy','image': 'https://placekitten.com/750/750','clicks': 0},{'id': 5, 'name': 'Jasmine','image': 'https://placekitten.com/750/650','clicks': 0}];


let catListTemplate = (id, name) => {
	return `<li class="cat-list-item" data-id="${id}">${name}</li>`;
};

/**
 * @type {Function}
 * @param {String} name    name of cat
 * @param {String} image   image url
 * @param {Number} clicks  number of clicks
 */
let catImageTemplate = (id, name, image, clicks) => {
	return `
	<figure>
		<h2>${name}</h2>
		<img class="cat-image" src="${image}" data-id="${id}" alt="Cat Image">
		<figcaption>
			<p>Cat Image Clicks: <span class="click-count">${clicks}</span></p>
		</figcaption>
	</figure>`;
};



/**
 * @type {Function}    add each cat to the DOM
 */
data.forEach(cat => {
	document.querySelector('.cat-list').innerHTML += catListTemplate(cat.id, cat.name);
});

let cats = document.querySelectorAll('.cat-list-item');
cats.forEach(cat => cat.addEventListener('click', function() {
	for(let i = 0; i < data.length; i++) {
		if (Number(this.dataset.id) === data[i].id) {
			document.querySelector('.cat-image-container').innerHTML = catImageTemplate(data[i].id, data[i].name, data[i].image, data[i].clicks);
		}
	}
}));

let catImageContainer = document.querySelector('.cat-image-container');
catImageContainer.addEventListener('click', function() {
	this.querySelector('.cat-image').addEventListener('click', function(e) {
		e.stopPropagation();
		data[this.dataset.id].clicks += 1;
		this.parentNode.querySelector('.click-count').innerText = data[this.dataset.id].clicks;
	});
});