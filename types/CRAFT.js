import ITEMS from './ITEMS.js';
import CONTAINERS from './CONTAINERS.js';
import ACTIONS from './ACTIONS.js';

const CRAFT = {
	BACKPACK: {
		INGREDIENTS: [ITEMS.RAG, ITEMS.RAG, ITEMS.FIREWOOD],
		ITEMS: [ITEMS.BACKPACK]
	},
	CAMPFIRE: {
		INGREDIENTS: [ITEMS.FIREWOOD, ITEMS.AXE, ITEMS.ROCK],
		CONTAINER: CONTAINERS.CAMPFIRE
	},
	RAG: {
		INGREDIENTS: [ITEMS.AXE, ITEMS.SHIRT],
		ITEMS: [ITEMS.RAG, ITEMS.RAG, ITEMS.RAG]
	},
	SLEEPING_BAG: {
		INGREDIENTS: [ITEMS.RAG, ITEMS.RAG, ITEMS.BACKPACK],
		ITEMS: [ITEMS.SLEEPING_BAG]
	},
	WASH_HANDS: {
		INGREDIENTS: [ITEMS.BOTTLE, ITEMS.WATER],
		ACTION: ACTIONS.WASH_HANDS
	}
};

export default CRAFT;
