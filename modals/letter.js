import TYPES from '../types/index.js';

export const letter_ui = function () {
	const title = document.querySelector('[data-el="letter-title"]');
	const message = document.querySelector('[data-el="letter-message"]');

	message.value = Letter.message;

	if (Letter.type == TYPES.ITEMS.LETTER_RECEIVED) {
		message.readonly = true;
	}

	if (Letter.type == TYPES.ITEMS.LETTER_BLANK) {
		message.readonly = false;
		message.addEventListener('keyup', set_letter_message);
	}
};

const set_letter_message = function (event) {
	const value = event.target.value;
	Letter.message = value;
};
