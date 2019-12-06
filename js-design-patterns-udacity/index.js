let cats = document.querySelectorAll('.cat-image');
let catNames = ["Tiger", "Rex"];

/**
 * Add click events to all cat images
 */
cats.forEach(image => image.addEventListener('click', function() {
	let counter = this.parentNode.querySelector('.click-count');
	counter.innerText = Number(counter.innerText) + 1;
}));

/**
 * Add Cat's Name
 * @param {String} el			Tag Name to be created
 * @param {String} text 	Cat's Name
 */
function addName(el, text, place) {
	let newEl = document.createElement(el); 
	// and give it some content 
	let newContent = document.createTextNode(text); 
	// add the text node to the newly created div
	newEl.appendChild(newContent);  

	// add the newly created element and its content into the DOM  
	place.prepend(newEl);
}

cats.forEach((image, i) => {
	addName('h2', catNames[i], image.parentNode);
});