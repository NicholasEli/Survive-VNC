import TYPES from '../../types/index.js';
import Item from '../items/index.js';
import { uuid } from '../helpers.js';
import inventory from '../inventory.js';

const CAMPFIRE = () => ({
	id: null,
	name: TYPES.CONTAINERS.CAMPFIRE,
	instance: null,
	x: 0,
	y: 0,
	active: true,
	capacity: 5,
	condition: 100,
	inventory: [],
	sprite: {
		sheet: 'assets/containers/campfire_sprite.png',
		frames: 'assets/containers/campfire_frames.json'
	},
	load: function (scene) {
		this.id = uuid();

		scene.load.atlas(
			'campfire',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames}?v=${Date.now()}`
		);

		return scene;
	},
	create: async function (scene, direct_insert = false) {
		if (direct_insert) {
			const container = scene.matter.add
				.sprite(this.x, this.y, 'campfire', 'frame_1', {
					isStatic: true
				})
				.setDepth(TYPES.ZINDEX.CONTAINER);

			scene.anims.create({
				key: 'campfire',
				frames: scene.anims.generateFrameNames('campfire', {
					prefix: 'frame_',
					start: 1,
					end: 3,
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
			this.instance.play('campfire');

			this.lifecycle();

			return container;
		}

		const _load = () => {
			return new Promise((resolve) => {
				scene.load.once('complete', () => {
					if (!scene) return null;

					const container = scene.matter.add
						.sprite(this.x, this.y, 'campfire', 'frame_1', {
							isStatic: true
						})
						.setDepth(TYPES.ZINDEX.CONTAINER);

					scene.anims.create({
						key: 'campfire',
						frames: scene.anims.generateFrameNames('campfire', {
							prefix: 'frame_',
							start: 1,
							end: 3,
							zeroPad: 1
						}),
						frameRate: 5,
						repeat: -1
					});

					container.id = this.id;
					container.name = this.name;
					container.object = TYPES.CONTAINERS.CONTAINER;
					container.setInteractive();
					container.data = this;

					this.instance = container;
					this.instance.play('campfire');

					resolve(container);
				});
			});
		};

		scene.load.start();

		const container = await _load();

		this.lifecycle();

		return container;
	},
	lifecycle: function () {
		this.inventory.push({ ...Item(TYPES.ITEMS.FIRE) });

		const lifecycle = setInterval(() => {
			this.condition = this.condition - 10;
			this.inventory = this.inventory.filter((item) => item.type == TYPES.ITEMS.FIRE);

			if (this.condition <= 0) {
				clearInterval(lifecycle);
				close_all_modals();
				this.inventory;
				this.instance.stop('campfire');
				this.instance.setFrame('frame_4');
				this.inventory = [{ ...Item(TYPES.ITEMS.ASH) }];
			}
		}, 5000);
	},
	toggle: function (scene) {
		Container = null;

		if (this.active) {
			close_all_modals();
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

export default CAMPFIRE;
