import TYPES from '../types/index.js';
import Player from '../Player.js';
import Containers from '../containers/index.js';
import Item from '../items/index.js';
import toast from '../toast.js';
import events from '../events.js';

modal_craft = {
	ui: function () {
		const wrapper = document.querySelector('[data-el="craft-items"]');
		wrapper.innerHTML = '';

		if (Craft_Inventory.length < 2) {
			document.body.classList.remove('craft-actions');
		} else {
			document.body.classList.add('craft-actions');
		}

		const match = this.match();
		const craftable = document.querySelector('[data-el="craftable"]');

		if (match && match.CONTAINER) craftable.innerText = match.CONTAINER;
		if (match && match.ACTION) craftable.innerText = match.ACTION;
		if (match && match.ITEMS) craftable.innerText = match.ITEMS;

		if (craftable && !match) {
			craftable.innerText = 'None';
		}

		Craft_Inventory.forEach((item) => {
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
				Selected_Item = item;
				modal_inventory.return_item();
			});
		});
	},
	match: function () {
		if (!Craft_Inventory) {
			toast.danger(TYPES.TOAST.CRAFT.EMPTY);
			return null;
		}

		const set = new Set(Craft_Inventory.map((item) => item.type));
		for (const [item, { INGREDIENTS }] of Object.entries(TYPES.CRAFT)) {
			const match = INGREDIENTS.every((ingredient) => set.has(ingredient));

			if (match) {
				return TYPES.CRAFT[item];
			}
		}

		return null;
	},
	make: async function () {
		if (!Craft_Inventory) {
			toast.danger(TYPES.TOAST.CRAFT.EMPTY);
			return null;
		}

		const match = this.match();
		const items = [...Craft_Inventory];

		items.forEach((item) => {
			const index = Craft_Inventory.findIndex(() => match.INGREDIENTS.includes(item.type));

			Craft_Inventory = Craft_Inventory.filter((i) => i.id != item.id);

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
	},
	craft_item: function () {
		if (Craft_Inventory.length >= 3) {
			toast.danger(TYPES.TOAST.CRAFT.LIMIT);
			return;
		}

		Craft_Inventory.push(Selected_Item);
		Player.inventory = Player.inventory.filter((item) => item.id != Selected_Item.id);
		Selected_Item = null;
		this.ui();
		modal_inventory.ui();
		modal_inventory.clear_actions();
	},
	craft_items: function () {
		const match = this.match();
		if (!match) {
			toast.danger(TYPES.TOAST.CRAFT.UNUSABLE);
			return;
		}

		this.make();
		this.ui();
		modal_inventory.ui();
		close_all_modals();
		set_attributes();
	}
};

export default modal_craft;
