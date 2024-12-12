import TYPES from '../types/index.js';
import Containers from '../containers/index.js';
import Items from '../items/index.js';
import toast from '../toast.js';
import events from '../events.js';

const craft = {
	match: function () {
		if (!Craft) {
			toast.danger(TYPES.TOAST.CRAFT.EMPTY);
			return null;
		}

		const set = new Set(Craft.map((item) => item.type));

		for (const [item, { INGREDIENTS }] of Object.entries(TYPES.CRAFT)) {
			const match = INGREDIENTS.every((ingredient) => set.has(ingredient));

			if (match) {
				return TYPES.CRAFT[item];
			}
		}

		return null;
	},
	make: async function () {
		if (!Craft) {
			toast.danger(TYPES.TOAST.CRAFT.EMPTY);
			return null;
		}

		const match = this.match();
		const items = [...Craft];

		items.forEach((item) => {
			const index = Craft.findIndex(() => match.INGREDIENTS.includes(item.type));

			Craft = Craft.filter((i) => i.id != item.id);

			if (index == -1 || !TYPES.CONSUMABLE[item.type]) {
				Player.inventory.push(item);
			}
		});

		if (match.CONTAINER) {
			const container = Containers[TYPES.CONTAINERS[match.CONTAINER]]();
			container.x = Player.instance.x;
			container.y = Player.instance.y;
			container.inventory = [];

			Region.config.environment.containers.push(container);
			const scene = container.load(Game.scene.scenes[0]);
			await container.create(scene);
		}

		if (match.ITEM) {
			//
		}

		if (match.ACTION) {
			Player.actions(match.ACTION);
		}

		return match;
	}
};

export default craft;
