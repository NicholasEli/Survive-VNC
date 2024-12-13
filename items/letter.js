import { letter_ui } from '../modals/letter.js';

const letter = function (item) {
	item.use = function () {
		close_all_modals();
		document.body.classList.add('letter');
		Letter = item;
		letter_ui();
	};

	item.message = '';

	return item;
};

export default letter;
