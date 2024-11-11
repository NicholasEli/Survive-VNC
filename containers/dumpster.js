import TYPES from '../../types/index.js';
import { uuid } from '../helpers.js';
import inventory from '../inventory.js';

const DUMPSTER = () => ({
	id: null,
	name: TYPES.CONTAINERS.DUMPSTER,
	instance: null,
	x: 0,
	y: 0,
	active: false,
	capacity: 10,
	inventory: [],
	sprite: {
		sheet: 'assets/containers/dumpster_sprite.png',
		frames: 'assets/containers/dumpster_frames.json'
	},
	load: function (scene) {
		this.id = uuid();

		scene.load.atlas(
			'dumpster',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames}?v=${Date.now()}`
		);

		return scene;
	},
	create: function (scene) {
		if (!scene) return null;

		const container = scene.matter.add
			.sprite(this.x, this.y, 'dumpster', 'frame_1', {
				isStatic: true
			})
			.setDepth(TYPES.ZINDEX.CONTAINER);

		scene.anims.create({
			key: 'dumpster_open',
			frames: scene.anims.generateFrameNames('dumpster', {
				prefix: 'frame_',
				start: 1,
				end: 4,
				zeroPad: 1
			}),
			frameRate: 10,
			repeat: 0
		});

		scene.anims.create({
			key: 'dumpster_close',
			frames: scene.anims.generateFrameNames('dumpster', {
				prefix: 'frame_',
				start: 4,
				end: 1,
				zeroPad: 1
			}),
			frameRate: 10,
			repeat: 0
		});

		container.id = this.id;
		container.name = this.name;
		container.object = TYPES.CONTAINERS.CONTAINER;
		container.setInteractive();
		container.data = this;

		this.instance = container;

		return container;
	},
	toggle: function () {
		Container = null;

		if (this.active) {
			close_all_modals();
			this.active = false;
			this.instance.play('dumpster_close');
			return false;
		}

		this.active = true;
		Container = this;
		inventory();

		this.instance.play('dumpster_open');

		this.instance.play('dumpster_open').on('animationcomplete', () => {
			if (this.active) {
				document.body.classList.add('container');
				document.body.classList.add('inventory');
			}
		});

		return true;
	},
	take: function (item) {
		this.inventory.push(item);
	},
	remove: function (item) {
		this.inventory = this.inventory.filter((i) => i.id != item.id);
	}
});

export default DUMPSTER;
