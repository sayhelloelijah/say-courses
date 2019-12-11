import { modal } from './modal.js';
import { view } from './view.js';

export const controller = {
	getAllCats: function() {
		return modal.getCats();
	},

	getCatById: function(id) {
		return modal.getCats().find(cat => parseInt(cat.id) == id);
	},

	incrementCounter: function(id) {
		let data = modal.getCats();
		data[id].clicks = controller.getCatById(id).clicks += 1;
		modal.updateData(data);
	},
	
	save: function(data) {
		modal.updateData(data);
	},

	init: function() {
		modal.init();
		view.init();
	}
};