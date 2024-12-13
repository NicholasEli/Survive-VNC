import TYPES from '../types/index.js';
import toast from '../toast.js';
import container from './container.js';
import craft from './craft.js';

modal_inventory = {
	ui: function () {
		const item_title = document.querySelector('[data-el="item-title"]');
		const title = document.querySelector('[data-el="inventory-title"]');
		let title_text = 'Inventory';
		const capacity = Player.inventory.length;

		title_text += ` (${capacity} / ${Player.capacity()})`;
		title.innerText = title_text;

		const wrapper = document.querySelector('[data-el="inventory-items"]');
		wrapper.innerHTML = '';

		const hbc = document.createElement('div');
		hbc.classList.add('inventory__item', 'inventory__item--hbc');

		const hbc_image = document.createElement('img');
		hbc_image.src = '/assets/hudsons-bay-company-coin.png';
		hbc_image.alt = Player.hbc + ' HBC Coin';

		const hbc_total = document.querySelector('span');
		hbc_total.innerText = Player.hbc;

		hbc.appendChild(hbc_image);
		hbc.appendChild(hbc_total);

		wrapper.appendChild(hbc);

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

				modal_inventory.clear_actions();

				if ((!Container && !Selected_Item) || (!Container && Selected_Item)) {
					Selected_Item = item;
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
	open: function () {
		document.body.classList.add('inventory', 'craft');
		modal_inventory.ui();
	},
	close_actions: function () {
		const btns = document.querySelectorAll('[data-inventory-item]');

		Selected_Item = null;
		btns.forEach((btn) => btn.classList.remove('active'));
		modal_inventory.clear_actions();
	},
	use_item: function () {
		if (!Player || !Selected_Item) return;

		if (!Selected_Item.use) {
			toast.danger(TYPES.TOAST.ITEM.UNUSABLE);
			return;
		}

		Selected_Item.use();
		this.ui();
		modal_inventory.clear_actions();
		set_attributes();
	},
	drop_item: function () {
		if (!Player || !Selected_Item) return;
		modal_inventory.clear_actions();
		Player.drop(Selected_Item);
		close_all_modals();
		this.ui();
	},
	return_item: function () {
		Player.inventory.push(Selected_Item);
		Craft_Inventory = Craft_Inventory.filter((item) => item.id != Selected_Item.id);
		Selected_Item = null;
		craft.ui();
		this.ui();
	},

	clear_actions: function () {
		document.body.classList.remove(
			'inventory-actions',
			'action-use-item',
			'action-craft-item',
			'action-drop-item'
		);
	}
};

export default modal_inventory;
