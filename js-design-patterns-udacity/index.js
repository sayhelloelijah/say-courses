let cats = document.querySelectorAll('.cat-image');
let catNames = ["Tiger", "Rex"];

/**
 * Add click events to all cat images
 * Increment counter with each click
 */
cats.forEach(image => image.addEventListener('click', function() {
	let counter = this.parentNode.querySelector('.click-count');
	counter.innerText = Number(counter.innerText) + 1;
}));

/**
 * Add Name
 * adds given name to the DOM before the given element
 * 
 * @param {String} el			Tag Name to be created
 * @param {String} text 	Cat's Name
 * @param {Node}   place  DOM element to place new element before
 */
function addName(el, text, place) {
	let newEl = document.createElement(el); 
	let newContent = document.createTextNode(text); 
	newEl.appendChild(newContent);  
	place.prepend(newEl);
}

/**
 * Add Names to each instance of cat
 */
cats.forEach((image, i) => {
	addName('h2', catNames[i], image.parentNode);
});