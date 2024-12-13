import TYPES from '../types/index.js';
import Containers from '../containers/index.js';
import Item from '../items/index.js';
import toast from '../toast.js';
import events from '../events.js';

const craft = {
	ui: function () {
		const wrapper = document.querySelector('[data-el="craft-items"]');
		wrapper.innerHTML = '';

		if (Craft.length < 2) {
			document.body.classList.remove('craft-actions');
		} else {
			document.body.classList.add('craft-actions');
		}

		const match = craft.match();
		const craftable = document.querySelector('[data-el="craftable"]');

		if (match && match.CONTAINER) craftable.innerText = match.CONTAINER;
		if (match && match.ACTION) craftable.innerText = match.ACTION;
		if (match && match.ITEMS) craftable.innerText = match.ITEMS;

		if (!match) {
			craftable.innerText = 'None';
		}

		Craft.forEach((item) => {
			const btn = document.createElement('button');
			const image = document.createElement('img');
			const span = document.createElement('span');

			btn.classList.add('craft__item');
			btn.title = item.type.replace(/_/g, ' ');
			btn.setAttribute('data-craft-item', item.id);

			image.src = TYPES.SOURCE[item.type];

			btn.append(image);
			btn.append(span);
			wrapper.appendChild(btn);

			btn.addEventListener('click', () => {
				Item = item;
				return_item();
			});
		});
	},
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

		if (match.ITEMS) {
			match.ITEMS.forEach((item) => {
				Player.inventory.push({ ...Item(TYPES.ITEMS[item]) });
			});
		}

		if (match.ACTION) {
			Player.actions(match.ACTION);
		}

		return match;
	}
};

export default craft;
