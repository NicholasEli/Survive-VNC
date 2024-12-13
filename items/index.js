import TYPES from '../types/index.js';
import toast from '../toast.js';
import { uuid } from '../helpers.js';
import backpack from './backpack.js';
import bottle from './bottle.js';
import letter from './letter.js';
import rag from './rag.js';
import sleeping_bag from './sleeping-bag.js';

const Item = (type) => {
	let item = {
		id: uuid(),
		type,
		condition: 100,
		src: null,
		x: 0,
		y: 0,
		value: 5
	};

	if (type == TYPES.ITEMS.BACKPACK) item = { ...item, ...backpack(item) };
	if (type == TYPES.ITEMS.RAG) item = { ...item, ...rag(item) };
	if (type == TYPES.ITEMS.BOTTLE) item = { ...item, ...bottle(item) };
	if (type == TYPES.ITEMS.SLEEPING_BAG) item = { ...item, ...sleeping_bag(item) };

	if (type == TYPES.ITEMS.LETTER_BLANK || type == TYPES.LETTER_RECEIVED) {
		item = { ...item, ...letter(item) };

		if (type == TYPES.LETTER_RECEIVED) {
			item.readonly = true;
		}

		if (type == TYPES.ITEMS.LETTER_BLANK) {
			item.message = '';
			item.readonly = false;
		}
	}

	return item;
};

export default Item;
