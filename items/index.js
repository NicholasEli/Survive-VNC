import TYPES from '../types/index.js';
import toast from '../toast.js';
import { uuid } from '../helpers.js';
import { letter_ui } from '../modals/letter.js';

const Item = (type) => {
	const item = {
		id: uuid(),
		type,
		condition: 100,
		src: null,
		x: 0,
		y: 0
	};

	/** Bottles **/
	if (type == TYPES.ITEMS.BOTTLE) {
		item.use = function () {
			const water = Player.inventory.find((item) => item.type == TYPES.ITEMS.WATER);

			if (!water) {
				toast.danger(TYPES.TOAST.ITEM.MISSING.WATER);
				return null;
			}

			Player.remove(water);
			Player.setAttribute(TYPES.PLAYER.ATTRIBUTES.THIRST, 10);
		};
	}

	/** Letter **/
	if (type == TYPES.ITEMS.LETTER_BLANK || type == TYPES.LETTER_RECEIVED) {
		item.use = function () {
			close_all_modals();
			document.body.classList.add('letter');
			Letter = item;
			letter_ui();
		};
	}

	if (type == TYPES.LETTER_RECEIVED) {
		item.readonly = true;
	}

	if (type == TYPES.ITEMS.LETTER_BLANK) {
		item.message = '';
		item.readonly = false;
	}

	/** Rag **/
	if (type == TYPES.ITEMS.RAG) {
		item.use = function () {
			Player.remove(item);
			Player.actions(TYPES.ACTIONS.WRAP_SPRAIN);
		};
	}

	return item;
};

export default Item;
