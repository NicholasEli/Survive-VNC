import TYPES from '../../types/index.js';
import { uuid } from '../helpers.js';
import inventory from '../inventory.js';

const NEWSPAPER_MACHINE = () => ({
	id: null,
	name: TYPES.CONTAINERS.NEWSPAPER_MACHINE,
	instance: null,
	x: 0,
	y: 0,
	active: false,
	capacity: 5,
	inventory: [],
	sprite: {
		toggle_sheet: 'assets/containers/newspaper_machine_sprite.png',
		toggle_frames: 'assets/containers/newspaper_machine_frames.json'
	},
	load: function (scene) {
		this.id = uuid();

		scene.load.atlas(
			'newspaper_machine',
			`${this.sprite.toggle_sheet}?v=${Date.now()}`,
			`${this.sprite.toggle_frames}?v=${Date.now()}`
		);

		return scene;
	},
	create: function (scene) {
		if (!scene) return null;

		const container = scene.matter.add
			.sprite(this.x, this.y, 'newspaper_machine', 'frame_1', {
				isStatic: true
			})
			.setDepth(TYPES.ZINDEX.CONTAINER);

		scene.anims.create({
			key: 'toggle',
			frames: scene.anims.generateFrameNames('newspaper_machine', {
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

export default NEWSPAPER_MACHINE;
