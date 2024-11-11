import TYPES from './types/index.js';
import toast from './toast.js';
import craft from './craft.js';

const container_ui = function () {
	if (!Container) return;

	const title = document.querySelector('[data-el="container-title"]');
	let title_text = Container.name.replace(/_/g, ' ');
	title_text = title_text + ` (${Container.inventory.length} / ${Container.capacity})`;
	title.innerText = title_text;

	const wrapper = document.querySelector('[data-el="container-items"]');
	wrapper.innerHTML = '';

	Container.inventory.forEach((item) => {
		const btn = document.createElement('btn');
		const image = document.createElement('img');
		const take_span = document.createElement('span');

		btn.classList.add('container__item');
		btn.title = item.type.replace(/_/g, ' ');
		btn.setAttribute('data-container-item', item.id);
		if (!TYPES.CONSUMABLE[item.type]) btn.setAttribute('data-item-cnd', 'CND: ' + item.condition);

		take_span.innerText = 'Take';
		take_span.classList.add('take');

		image.src = TYPES.SOURCE[item.type];

		btn.append(image);
		btn.append(take_span);
		wrapper.appendChild(btn);

		btn.addEventListener('click', () => {
			if (btn.className.indexOf('take') == -1) {
				btn.classList.toggle('take');
				return;
			}

			if (btn.className.indexOf('take') > -1) {
				if (Container.inventory.length + 1 > Container.capacity) return;

				Container.remove(item);
				Player.take(item);
				container_ui();
				inventory_ui();

				if (Container.inventory.length <= 0 && Container.consumable && Container.instance.body) {
					Container.instance.scene.matter.world.remove(Container.instance.body);
					Container.instance.destroy();
				}
			}
		});
	});
};

const inventory_ui = function () {
	const title = document.querySelector('[data-el="inventory-title"]');
	let title_text = 'Inventory';

	let capacity = Player.inventory.length;
	let max_capacity = Player.capacity;
	if (Player.backpack) {
		capacity = capacity + Player.backpack.inventory.length;
		max_capacity = max_capacity + Player.backpack.capacity;
	}

	title_text += ` (${capacity} / ${max_capacity})`;
	title.innerText = title_text;

	const wrapper = document.querySelector('[data-el="inventory-items"]');
	wrapper.innerHTML = '';

	Player.inventory.forEach((item) => {
		const btn = document.createElement('btn');
		const image = document.createElement('img');
		const drop_span = document.createElement('span');
		const place_span = document.createElement('span');

		btn.classList.add('inventory__item');
		btn.title = item.type.replace(/_/g, ' ');
		btn.setAttribute('data-inventory-item', item.id);
		//if (!item.consumable) btn.setAttribute('data-item-cnd', 'CND: ' + item.condition);

		drop_span.innerText = 'Drop';
		drop_span.classList.add('drop');

		place_span.innerText = 'Place';
		place_span.classList.add('place');

		image.src = TYPES.SOURCE[item.type];

		btn.append(image);
		btn.append(drop_span);
		btn.append(place_span);
		wrapper.appendChild(btn);

		btn.addEventListener('click', () => {
			document
				.querySelectorAll('[data-inventory-item]')
				.forEach((b) => b.classList.remove('active'));

			btn.classList.add('active');

			if (Container && btn.className.indexOf('place') == -1) {
				btn.classList.toggle('place');
				return;
			}

			if (Container && btn.className.indexOf('place') > -1) {
				if (capacity + 1 > max_capacity) return;

				Container.take(item);
				Player.remove(item);
				container_ui();
				inventory_ui();
				return;
			}

			if (!Container && !Item) {
				Item = item;
				document.body.classList.add('inventory-actions');
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

	if (match) {
		craftable.innerText = match.CONTAINER;
	} else {
		craftable.innerText = '';
	}

	Craft.forEach((item) => {
		const btn = document.createElement('btn');
		const image = document.createElement('img');
		const span = document.createElement('span');

		span.innerText = 'X';

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
};

drop_item = function () {
	if (!Player || !Item) return;

	Player.inventory = Player.inventory.filter((item) => item.id !== Item.id);
	inventory_ui();
	document.body.classList.remove('inventory-actions');
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
	document.body.classList.remove('inventory-actions');
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
	document.body.classList.remove('inventory-actions');
};

close_all_modals = function () {
	document.body.classList.remove(
		'inventory',
		'container',
		'note',
		'craft',
		'inventory-actions',
		'craft-actions'
	);

	Craft.forEach((item) => {
		Player.inventory.push(item);
	});

	if (Container) Container.toggle();
	Container = null;
	Item = null;
	Craft = [];
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
