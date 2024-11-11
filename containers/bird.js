import TYPES from '../../types/index.js';
import Item from '../items/index.js';
import { uuid, is_container_locked } from '../helpers.js';
import inventory from '../inventory.js';
import toast from '../toast.js';

const BIRD = () => ({
	id: null,
	name: TYPES.CONTAINERS.BIRD,
	instance: null,
	x: 0,
	y: 0,
	active: false,
	consumable: true,
	capacity: 1,
	inventory: [],
	sprite: {
		sheet: 'assets/containers/bird_sprite.png',
		frames: 'assets/containers/bird_frames.json'
	},
	locked: true,
	requirements: [TYPES.ITEMS.AXE],
	load: function (scene) {
		this.id = uuid();

		scene.load.atlas(
			'bird',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames}?v=${Date.now()}`
		);

		return scene;
	},
	create: function (scene) {
		if (!scene) return null;

		const container = scene.matter.add
			.sprite(this.x, this.y, 'bird', 'frame_1', {
				isStatic: true
			})
			.setDepth(TYPES.ZINDEX.CONTAINER);

		scene.anims.create({
			key: 'bird',
			frames: scene.anims.generateFrameNames('bird', {
				prefix: 'frame_',
				start: 1,
				end: 3,
				zeroPad: 1
			}),
			frameRate: 1,
			repeat: -1
		});

		container.id = this.id;
		container.name = this.name;
		container.object = TYPES.CONTAINERS.CONTAINER;
		container.setInteractive();
		container.data = this;

		this.inventory.push({ ...Item(TYPES.ITEMS.MEAT_RAW) });
		this.instance = container;
		this.instance.play('bird');

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
		inventory();
		this.active = true;
		document.body.classList.add('container');

		return true;
	},
	take: function (item) {
		this.inventory.push(item);
	},
	remove: function (item) {
		this.inventory = this.inventory.filter((i) => i.id != item.id);
	}
});

export default BIRD;
