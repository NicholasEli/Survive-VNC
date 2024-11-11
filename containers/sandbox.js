import TYPES from '../../types/index.js';
import { uuid, is_container_locked } from '../helpers.js';
import inventory from '../inventory.js';
import toast from '../toast.js';

const SANDBOX = () => ({
	id: null,
	name: TYPES.CONTAINERS.SANDBOX,
	instance: null,
	x: 0,
	y: 0,
	active: false,
	capacity: 12,
	inventory: [],
	sprite: {
		sheet: 'assets/containers/sandbox_sprite.png',
		frames: 'assets/containers/sandbox_frames.json'
	},
	locked: true,
	requirements: [TYPES.ITEMS.SHOVEL],
	load: function (scene) {
		this.id = uuid();

		scene.load.atlas(
			'sandbox',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames}?v=${Date.now()}`
		);

		return scene;
	},
	create: function (scene) {
		if (!scene) return null;

		const container = scene.matter.add
			.sprite(this.x, this.y, 'sandbox', 'frame_1', {
				isStatic: true
			})
			.setDepth(TYPES.ZINDEX.CONTAINER);

		scene.anims.create({
			key: 'toggle',
			frames: scene.anims.generateFrameNames('sandbox', {
				prefix: 'frame_',
				start: 1,
				end: 2,
				zeroPad: 1
			}),
			frameRate: 10,
			repeat: -1
		});

		container.id = this.id;
		container.name = this.name;
		container.object = TYPES.CONTAINERS.CONTAINER;
		container.setInteractive();
		container.data = this;

		this.instance = container;

		return container;
	},
	toggle: function (scene) {
		Container = null;

		if (this.active) {
			document.body.classList.remove('container');
			document.body.classList.remove('inventory');
			this.active = false;
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
		document.body.classList.add('inventory');

		return true;
	},
	take: function (item) {
		this.inventory.push(item);
	},
	remove: function (item) {
		this.inventory = this.inventory.filter((i) => i.id != item.id);
	}
});

export default SANDBOX;
