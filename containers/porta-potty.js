import TYPES from '../../types/index.js';
import { uuid } from '../helpers.js';
import inventory from '../modals/inventory.js';

const PORTA_POTTY = () => ({
	id: null,
	name: TYPES.CONTAINERS.PORTA_POTTY,
	instance: null,
	x: 0,
	y: 0,
	active: false,
	capacity: 10,
	inventory: [],
	sprite: {
		sheet: 'assets/containers/porta_potty_sprite.png',
		frames: 'assets/containers/porta_potty_frames.json'
	},
	load: function (scene) {
		this.id = uuid();

		scene.load.atlas(
			'porta_potty',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames}?v=${Date.now()}`
		);

		return scene;
	},
	create: async function (scene) {
		if (!scene) return null;

		let req = await fetch('../assets/containers/porta_potty_frames.json');
		req = await req.json();
		const num_frames = Object.keys(req.frames).length;

		const container = scene.matter.add
			.sprite(this.x, this.y, 'porta_potty', 'frame_1', {
				isStatic: true
			})
			.setDepth(TYPES.ZINDEX.CONTAINER);

		scene.anims.create({
			key: 'porta-potty-open',
			frames: scene.anims.generateFrameNames('porta_potty', {
				prefix: 'frame_',
				start: 1,
				end: num_frames,
				zeroPad: 1
			}),
			frameRate: 10,
			repeat: 0
		});

		scene.anims.create({
			key: 'porta-potty-close',
			frames: scene.anims.generateFrameNames('porta_potty', {
				prefix: 'frame_',
				start: num_frames,
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
			this.instance.play('porta-potty-close');

			return false;
		}

		this.active = true;
		Container = this;
		inventory();

		this.instance.play('porta-potty-open');
		this.instance.play('porta-potty-open').on('animationcomplete', () => {
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

export default PORTA_POTTY;
