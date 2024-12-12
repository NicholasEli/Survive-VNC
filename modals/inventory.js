import TYPES from '../types/index.js';
import toast from '../toast.js';
import craft from '../modals/craft.js';

const container_ui = function () {
	if (!Container) return;

	const title = document.querySelector('[data-el="container-title"]');
	let title_text = Container.name.replace(/_/g, ' ');

	if (Container.capacity >= 9999) {
		title_text = title_text + ` (${Container.capacity} / ${Container.capacity})`;
	} else {
		title_text = title_text + ` (${Container.inventory.length} / ${Container.capacity})`;
	}

	title.innerText = title_text;

	const wrapper = document.querySelector('[data-el="container-items"]');
	wrapper.innerHTML = '';

	Container.inventory.forEach((item) => {
		if (!item) return;
		const btn = document.createElement('button');
		const image = document.createElement('img');
		const take_span = document.createElement('span');

		btn.classList.add('container__item');
		btn.title = item.type.replace(/_/g, ' ');
		btn.setAttribute('data-container-item', item.id);
		if (!TYPES.CONSUMABLE[item.type]) btn.setAttribute('data-item-cnd', 'CND: ' + item.condition);

		image.src = TYPES.SOURCE[item.type];

		btn.append(image);
		btn.append(take_span);
		wrapper.appendChild(btn);

		btn.addEventListener('click', () => {
			if (Player.inventory.length + 1 > Player.capacity) {
				toast.danger(TYPES.TOAST.PLAYER.INVENTORY.FULL);
				return;
			}

			Container.remove(item);
			Player.take(item);

			if (Container.illness) Player.actions(Container.illness);

			container_ui();
			inventory_ui();
			set_attributes();

			if (Container.inventory.length <= 0 && Container.consumable && Container.instance.body) {
				Container.instance.scene.matter.world.remove(Container.instance.body);
				Container.instance.destroy();
			}
		});
	});
};

close_inventory_actions = function () {
	const btns = document.querySelectorAll('[data-inventory-item]');

	Item = null;
	btns.forEach((btn) => btn.classList.remove('active'));
	clear_inventory_actions();
};

const inventory_ui = function () {
	const item_title = document.querySelector('[data-el="item-title"]');
	const title = document.querySelector('[data-el="inventory-title"]');
	let title_text = 'Inventory';
	const capacity = Player.inventory.length;

	title_text += ` (${capacity} / ${Player.capacity})`;
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
				Container.take(item);
				Player.remove(item);
				container_ui();
				inventory_ui();
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
};

const craft_ui = function () {
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
};

use_item = function () {
	if (!Player || !Item) return;

	if (!Item.use) {
		toast.danger(TYPES.TOAST.ITEM.UNUSABLE);
		return;
	}

	Item.use();
	inventory_ui();
	clear_inventory_actions();
	set_attributes();
};

drop_item = function () {
	if (!Player || !Item) return;
	clear_inventory_actions();
	Player.drop(Item);
	close_all_modals();
	inventory_ui();
};

return_item = function () {
	Player.inventory.push(Item);
	Craft = Craft.filter((item) => item.id != Item.id);
	Item = null;
	craft_ui();
	inventory_ui();
};

craft_item = function () {
	if (Craft.length >= 3) {
		toast.danger(TYPES.TOAST.CRAFT.LIMIT);
		return;
	}

	Craft.push(Item);
	Player.inventory = Player.inventory.filter((item) => item.id != Item.id);
	Item = null;
	craft_ui();
	inventory_ui();
	clear_inventory_actions();
};

craft_items = function () {
	const match = craft.match();
	if (!match) {
		toast.danger(TYPES.TOAST.CRAFT.UNUSABLE);
		return;
	}

	craft.make();
	craft_ui();
	inventory_ui();
	close_all_modals();
	set_attributes();
};

clear_inventory_actions = function () {
	document.body.classList.remove(
		'inventory-actions',
		'action-use-item',
		'action-craft-item',
		'action-drop-item'
	);
};

const inventory = function () {
	if (Container) {
		container_ui();
		inventory_ui();
		return;
	}

	inventory_ui();
	craft_ui();
};

open_inventory = function () {
	document.body.classList.add('inventory', 'craft');
	inventory();
};

export default inventory;
