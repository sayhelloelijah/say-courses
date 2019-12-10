import { modal, view } from './app';

export const controller = {
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