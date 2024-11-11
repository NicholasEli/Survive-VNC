import { uuid } from '../helpers.js';

const Item = (type) => ({
	id: uuid(),
	type,
	condition: 100,
	src: null,
	x: 0,
	y: 0
});

export default Item;
