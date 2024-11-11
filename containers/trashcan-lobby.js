import TYPES from '../../types/index.js';
import { uuid } from '../helpers.js';
import inventory from '../inventory.js';

const TRASHCAN_LOBBY = () => ({
	id: null,
	name: TYPES.CONTAINERS.TRASHCAN_LOBBY,
	instance: null,
	x: 0,
	y: 0,
	active: false,
	capacity: 6,
	inventory: [],
	sprite: {
		toggle_sheet: 'assets/containers/trashcan_lobby_sprite.png',
		toggle_frames: 'assets/containers/trashcan_lobby_frames.json'
	},
	load: function (scene) {
		this.id = uuid();

		scene.load.atlas(
			'transhcan_lobby',
			`${this.sprite.toggle_sheet}?v=${Date.now()}`,
			`${this.sprite.toggle_frames}?v=${Date.now()}`
		);

		return scene;
	},
	create: function (scene) {
		if (!scene) return null;

		let frame = 'frame_2';
		if (this.inventory.length) frame = 'frame_1';

		const container = scene.matter.add
			.sprite(this.x, this.y, 'transhcan_lobby', frame, {
				isStatic: true
			})
			.setDepth(TYPES.ZINDEX.CONTAINER);

		scene.anims.create({
			key: 'toggle',
			frames: scene.anims.generateFrameNames('transhcan_lobby', {
				prefix: 'frame_',
				start: 1,
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
	ui: function () {
		return ui(this);
	},
	toggle: function (scene) {
		Container = null;

		if (this.active) {
			this.active = false;
			this.instance.setFrame('frame_1');
			close_all_modals();
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

export default TRASHCAN_LOBBY;
