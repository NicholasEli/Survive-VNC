import TYPES from '../types/index.js';
import toast from '../toast.js';
import container from './container.js';
import craft from './craft.js';

const inventory = {
	ui: function () {
		const item_title = document.querySelector('[data-el="item-title"]');
		const title = document.querySelector('[data-el="inventory-title"]');
		let title_text = 'Inventory';
		const capacity = Player.inventory.length;

		title_text += ` (${capacity} / ${Player.capacity()})`;
		title.innerText = title_text;

		const wrapper = document.querySelector('[data-el="inventory-items"]');
		wrapper.innerHTML = '';

		Player.inventory.forEach((item) => {
			if (!item) return;
			const btn = document.createElement('button');
			const image = document.createElement('img');

			btn.classList.add('inventory__item');
			btn.title = item.type.replace(/_/g, ' ');
			btn.setAttribute('data-inventory-item', item.id);

			image.src = TYPES.SOURCE[item.type];

			btn.append(image);
			wrapper.appendChild(btn);

			btn.addEventListener('click', () => {
				document
					.querySelectorAll('[data-inventory-item]')
					.forEach((b) => b.classList.remove('active'));

				item_title.innerText = item.type;
				btn.classList.add('active');

				if (Container) {
					console.log(item);
					Container.take(item);
					Player.remove(item);
					container.ui();
					this.ui();
					return;
				}

				clear_inventory_actions();

				if ((!Container && !Item) || (!Container && Item)) {
					Item = item;
					if (item.use) {
						document.body.classList.add('inventory-actions', 'action-use-item');
					} else {
						document.body.classList.add('inventory-actions');
					}

					return;
				}
			});
		});
	},
	ui_with_container: function () {
		if (Container) {
			container.ui();
			this.ui();
			return;
		}

		this.ui();
		craft.ui();
	},
	open_inventory: function () {
		document.body.classList.add('inventory', 'craft');
		inventory();
	},
	close_inventory_actions: function () {
		const btns = document.querySelectorAll('[data-inventory-item]');

		Item = null;
		btns.forEach((btn) => btn.classList.remove('active'));
		clear_inventory_actions();
	},
	use_item: function () {
		if (!Player || !Item) return;

		if (!Item.use) {
			toast.danger(TYPES.TOAST.ITEM.UNUSABLE);
			return;
		}

		Item.use();
		this.ui();
		clear_inventory_actions();
		set_attributes();
	},
	drop_item: function () {
		if (!Player || !Item) return;
		clear_inventory_actions();
		Player.drop(Item);
		close_all_modals();
		this.ui();
	},
	return_item: function () {
		Player.inventory.push(Item);
		Craft = Craft.filter((item) => item.id != Item.id);
		Item = null;
		craft.ui();
		this.ui();
	},
	craft_item: function () {
		if (Craft.length >= 3) {
			toast.danger(TYPES.TOAST.CRAFT.LIMIT);
			return;
		}

		Craft.push(Item);
		Player.inventory = Player.inventory.filter((item) => item.id != Item.id);
		Item = null;
		craft.ui();
		this.ui();
		clear_inventory_actions();
	},
	craft_items: function () {
		const match = craft.match();
		if (!match) {
			toast.danger(TYPES.TOAST.CRAFT.UNUSABLE);
			return;
		}

		craft.make();
		craft.ui();
		this.ui();
		close_all_modals();
		set_attributes();
	},

	clear_inventory_actions: function () {
		document.body.classList.remove(
			'inventory-actions',
			'action-use-item',
			'action-craft-item',
			'action-drop-item'
		);
	}
};

export default inventory;
