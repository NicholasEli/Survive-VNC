import TYPES from '../../types/index.js';
import Item from '../items/index.js';
import { uuid, is_container_locked } from '../helpers.js';
import toast from '../toast.js';

const ROCK_PILE = () => ({
	id: null,
	name: TYPES.CONTAINERS.ROCK_PILE,
	instance: null,
	x: 0,
	y: 0,
	active: false,
	consumable: true,
	capacity: 2,
	inventory: [],
	sprite: {
		sheet: 'assets/containers/rock_pile_sprite.png',
		frames: 'assets/containers/rock_pile_frames.json'
	},
	locked: true,
	requirements: [TYPES.ITEMS.AXE],
	load: function (scene) {
		this.id = uuid();

		scene.load.atlas(
			'rock_pile',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames}?v=${Date.now()}`
		);

		return scene;
	},
	create: function (scene) {
		if (!scene) return null;

		const container = scene.matter.add
			.sprite(this.x, this.y, 'rock_pile', 'frame_1', {
				isStatic: true
			})
			.setDepth(TYPES.ZINDEX.CONTAINER);

		scene.anims.create({
			key: 'toggle',
			frames: scene.anims.generateFrameNames('rock_pile', {
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

		this.inventory.push({ ...Item(TYPES.ITEMS.ROCK) });

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

		Container = this;
		container.ui();
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

export default ROCK_PILE;
