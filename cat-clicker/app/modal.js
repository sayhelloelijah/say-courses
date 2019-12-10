export const modal = {
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