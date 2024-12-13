import TYPES from './types/index.js';
import toast from './toast.js';
import { degree, sprite_orientation, distance, ran_num } from './helpers.js';

const Player = {
	x: 0,
	y: 0,
	instance: null,
	inventory: [],
	backpack: null,
	hbc: 100,
	attributes: {
		health: 100,
		temperature: 100,
		illness: TYPES.ILLNESS.HEALTHY,
		hunger: 100,
		thirst: 100,
		capacity: TYPES.PLAYER.CAPACITY
	},
	gender: TYPES.PLAYER.GENDERS.FEMALE,
	orientation: 'forward',
	tween: null,
	sprite: {
		type: TYPES.CLOTHING.PLAIN,
		frames: []
	},
	moving: false,
	init: async function () {
		console.log('--Init Player--');

		let req = await fetch('/assets/player/frames.json');
		if (req.ok) {
			req = await req.json();

			const frames = {};
			for (let f in req.frames) {
				const { frame, group } = req.frames[f];

				//start
				if (!frames[group]) {
					const start = f.split('_')[1];
					frames[group] = {
						key: 'player_' + group,
						start
					};
				}

				if (frames[group]) {
					const end = f.split('_')[1];
					frames[group].end = end;
				}
			}

			for (let frame in frames) {
				this.sprite.frames.push(frames[frame]);
			}
		}

		if (Region) {
			this.x = Region.config.player.start.x;
			this.y = Region.config.player.start.y;
		}

		return this;
	},
	load: function (scene) {
		scene.load.atlas(
			this.sprite.type,
			`assets/player/${this.gender}/${this.sprite.type}/sprite.png`,
			`assets/player/frames.json`
		);

		return scene;
	},
	create: function (scene) {
		this.capacity();

		const player = scene.matter.add
			.sprite(this.x, this.y, this.sprite.type, 'frame_1')
			.setScale(0.5)
			.setDepth(TYPES.ZINDEX.PLAYER);

		this.sprite.frames.forEach((frame) => {
			const { key, start, end } = frame;

			scene.anims.create({
				key,
				frames: scene.anims.generateFrameNames(this.sprite.type, {
					prefix: 'frame_',
					start,
					end,
					zeroPad: 1
				}),
				frameRate: 10,
				repeat: -1
			});
		});

		player.id = 'player';
		this.instance = player;
		scene.player = player;
		return { player, scene };
	},
	getSpeed: function (distance) {
		return distance * 10;
	},
	move: function (scene, toX, toY) {
		if (this.moving == true) return;

		const capacity = this.capacity();

		if (this.inventory.length > capacity) {
			const drop_item = Math.round(Math.random());

			if (drop_item) {
				const item_index = ran_num(this.inventory.length);
				this.remove(this.inventory[item_index]);
				toast.danger(TYPES.TOAST.PLAYER.INVENTORY.OVER_ENCUMBERED);
			}
		}

		let _distance = distance(this.instance.x, this.instance.y, toX, toY);
		if (Player.attributes.illness == TYPES.ILLNESS.SPRAIN) {
			_distance = _distance + 100;
		}

		const _degree = degree(this.instance.x, this.instance.y, toX, toY);
		const orientation = sprite_orientation(_degree);
		const speed = this.getSpeed(_distance);

		this.moving = true;
		this.orientation = orientation;
		this.instance.play('player_move_' + orientation);

		this.tween = scene.tweens.add({
			targets: this.instance,
			x: toX,
			y: toY,
			duration: speed,
			onComplete: () => {
				this.moving = false;
				this.instance.stop();
			}
		});
	},
	remove: function (item) {
		this.capacity();
		this.inventory = this.inventory.filter((i) => i.id != item.id);
	},
	take: function (item) {
		const capacity = this.capacity();

		if (this.inventory.length + 1 > capacity) {
			toast.danger(TYPES.TOAST.PLAYER.INVENTORY.FULL);
			return;
		}

		this.inventory.push(item);
	},
	drop: function (item) {
		if (!item) return;
		this.moving = true;
		this.remove(item);
		this.capacity();

		this.instance.anims
			.play({
				key: 'player_grab_' + this.orientation,
				repeat: 0
			})
			.on('animationcomplete', () => {
				this.moving = false;
				this.instance.play('player_move_' + this.orientation);
				this.instance.stop();
			});
	},
	capacity: function () {
		let capacity = TYPES.PLAYER.CAPACITY;
		let backpack_capacity = 0;
		const backpacks = this.inventory.filter((item) => item.type == TYPES.ITEMS.BACKPACK);

		backpacks.forEach((backpack) => {
			if (backpack.capacity > backpack_capacity) {
				backpack_capacity = backpack.capacity;
			}
		});

		this.attributes.capacity = capacity + backpack_capacity;
		return this.attributes.capacity;
	},
	setAttribute: function (attribute, adjustment) {
		if (!attribute || !adjustment) return;

		if (attribute == TYPES.PLAYER.ATTRIBUTES.ILLNESS) {
			this.attributes[attribute] = adjustment;
			return;
		}

		this.attributes[attribute] = this.attributes[attribute] + adjustment;
	},
	actions: function (action) {
		const is_cured = Math.round(Math.random());
		const is_sick = Math.round(Math.random());

		/** Cures **/

		if (action == TYPES.ACTIONS.WASH_HANDS && is_cured) {
			this.setAttribute(TYPES.PLAYER.ATTRIBUTES.ILLNESS, TYPES.ILLNESS.HEALTHY);
			return;
		}

		if (action == TYPES.ACTIONS.WRAP_SPRAIN && is_cured) {
			this.setAttribute(TYPES.PLAYER.ATTRIBUTES.ILLNESS, TYPES.ILLNESS.HEALTHY);
			return;
		}

		/** Illnesses **/

		if (action == TYPES.ILLNESS.SALMONELLA && is_sick) {
			this.setAttribute(TYPES.PLAYER.ATTRIBUTES.ILLNESS, TYPES.ILLNESS.SALMONELLA);
			return;
		}

		if (action == TYPES.ILLNESS.SPRAIN && is_sick) {
			this.setAttribute(TYPES.PLAYER.ATTRIBUTES.ILLNESS, TYPES.ILLNESS.SPRAIN);
			return;
		}
	},
	illness: function () {
		if (this.attributes.illness == TYPES.ILLNESS.SALMONELLA) {
			this.attributes.health = this.attributes.health - 3;
		}

		if (this.attributes.illness == TYPES.ILLNESS.SPRAIN) {
			this.attributes.health = this.attributes.health - 1;
		}
	},
	health: function (health) {
		if (this.attributes.health <= 0) {
			this.moving = true;
			this.instance.play({
				key: 'player_dead',
				repeat: 0
			});
			return;
		}

		if (health) {
			this.attributes.health = this.attributes.health + health;

			if (this.attributes.health > 100) this.attributes.health = 100;
		}

		return this.attributes.health;
	},
	hunger: function () {
		if (this.attributes.hunger <= 0 && this.attributes.health > 0) {
			this.attributes.health = this.attributes.health - 1;
			this.attributes.hunger = 0;
			return this.attributes.hunger;
		}

		this.attributes.hunger = this.attributes.hunger - 1;
		return this.attributes.hunger;
	},
	thirst: function () {
		if (this.attributes.thirst <= 0 && this.attributes.health > 0) {
			this.attributes.health = this.attributes.health - 1;
			this.attributes.thirst = 0;
			return this.attributes.thirst;
		}

		this.attributes.thirst = this.attributes.thirst - 2;
		return this.attributes.thirst;
	},
	temperature: function () {
		this.attributes.temperature = this.attributes.temperature - 1;
	}
};

export default Player;
