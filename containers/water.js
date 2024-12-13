import TYPES from '../../types/index.js';
import Item from '../items/index.js';
import { uuid, is_container_locked } from '../helpers.js';
import toast from '../toast.js';

const WATER = () => ({
	id: null,
	name: TYPES.CONTAINERS.WATER,
	instance: null,
	width: 10,
	height: 10,
	x: 0,
	y: 0,
	active: false,
	consumable: false,
	capacity: 9999,
	inventory: [],
	locked: true,
	requirements: [TYPES.ITEMS.BOTTLE],
	load: function (scene) {
		this.id = uuid();

		return scene;
	},
	create: async function (scene) {
		if (!scene) return null;

		const container = scene.add
			.rectangle(this.x, this.y, this.width, this.height, {
				isStatic: true,
				name: this.name
			})
			.setDepth(TYPES.ZINDEX.CONTAINER)
			.setAlpha(0.1)
			.setInteractive();

		container.id = this.id;
		container.name = this.name;
		container.object = TYPES.CONTAINERS.CONTAINER;
		container.data = this;

		this.inventory.push({ ...Item(TYPES.ITEMS.WATER) });
		this.instance = container;

		return container;
	},
	toggle: function (scene) {
		Container = null;

		if (this.active) {
			this.active = false;
			close_all_modals();
			return false;
		}

		if (is_container_locked(this)) {
			toast.danger(TYPES.TOAST.CONTAINER.LOCKED);
			return false;
		}

		Container = this;
		this.active = true;
		document.body.classList.add('container', 'inventory');

		return true;
	},
	take: function (item) {
		return this.inventory;
	},
	remove: function (item) {
		this.inventory = this.inventory.filter((i) => i.id != item.id);
		this.inventory.push({ ...Item(TYPES.ITEMS.WATER) });
		return this.inventory;
	}
});

export default WATER;
