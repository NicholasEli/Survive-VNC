import TYPES from '../../types/index.js';
import Item from '../items/index.js';
import { uuid, async_timeout } from '../helpers.js';
import inventory from '../modals/inventory.js';

const CAMPFIRE = () => ({
	id: null,
	name: TYPES.CONTAINERS.CAMPFIRE,
	instance: null,
	width: 16,
	height: 16,
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
		let req = await fetch('../assets/containers/campfire_frames.json');
		req = await req.json();
		const num_frames = Object.keys(req.frames).length;

		if (direct_insert) {
			const container = scene.matter.add
				.sprite(this.x, this.y, 'campfire', 'frame_1', {
					isStatic: true,
					isSensor: true
				})
				.setDepth(TYPES.ZINDEX.CONTAINER);

			scene.anims.create({
				key: 'campfire',
				frames: scene.anims.generateFrameNames('campfire', {
					prefix: 'frame_',
					start: 1,
					end: num_frames - 1,
					zeroPad: 1
				}),
				frameRate: 10,
				repeat: -1
			});

			scene.matter.add.rectangle(this.x, this.y, this.width, this.height, {
				isStatic: true,
				name: TYPES.CONTAINERS.DUMPSTER
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
							isStatic: true,
							isSensor: true
						})
						.setDepth(TYPES.ZINDEX.CONTAINER);

					scene.anims.create({
						key: 'campfire',
						frames: scene.anims.generateFrameNames('campfire', {
							prefix: 'frame_',
							start: 1,
							end: num_frames - 1,
							zeroPad: 1
						}),
						frameRate: 5,
						repeat: -1
					});

					scene.matter.add.rectangle(this.x, this.y, this.width, this.height, {
						isStatic: true,
						name: TYPES.CONTAINERS.DUMPSTER
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
	lifecycle: async function () {
		let req = await fetch('../assets/containers/campfire_frames.json');
		req = await req.json();
		const num_frames = Object.keys(req.frames).length;

		this.inventory.push({ ...Item(TYPES.ITEMS.FIRE) });

		const _lifecyle = async () => {
			await async_timeout(5000);

			this.inventory = this.inventory.map((item) => {
				if (item.type == TYPES.ITEMS.WATER) {
					this.condition = 0;
					return;
				}
				if (item.type == TYPES.ITEMS.MEAT_RAW) return { ...Item(TYPES.ITEMS.MEAT_COOKED) };
				if (item.type == TYPES.ITEMS.FIRE || item.type == TYPES.ITEMS.MEAT_COOKED) return item;
			});

			inventory();
			this.condition = this.condition - 10;

			if (this.condition <= 0) return;

			await _lifecyle();
		};

		await _lifecyle();

		close_all_modals();
		this.inventory;
		this.instance.stop('campfire');
		this.instance.setFrame('frame_' + num_frames);
		this.inventory = [{ ...Item(TYPES.ITEMS.ASH) }];
		close_all_modals();
		this.active = false;
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
		document.body.classList.add('container', 'inventory');

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
