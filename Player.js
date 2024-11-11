import TYPES from './types/index.js';
import { degree, sprite_orientation, distance } from './helpers.js';
import Item from './items/index.js';

Player = {
	x: 0,
	y: 0,
	instance: null,
	inventory: [
		{ ...Item(TYPES.ITEMS.AXE) },
		{ ...Item(TYPES.ITEMS.SHOVEL) },
		{ ...Item(TYPES.ITEMS.FIREWOOD) },
		{ ...Item(TYPES.ITEMS.ROCK) }
	],
	capacity: TYPES.PLAYER.CAPACITY,
	backpack: null,
	attributes: {
		health: 100,
		temperature: 100,
		illness: TYPES.ILLNESS.HEALTHY,
		hunger: 100,
		thirst: 100
	},
	gender: TYPES.PLAYER.GENDERS.MALE,
	orientation: 'forward',
	tween: null,
	sprite: {
		sheet: 'assets/player/sprite.png',
		frames_walk_forward: 'assets/player/frames_walk_forward.json',
		frames_walk_backward: 'assets/player/frames_walk_backward.json',
		frames_walk_left: 'assets/player/frames_walk_left.json',
		frames_walk_right: 'assets/player/frames_walk_right.json'
	},
	init: function () {
		console.log('--Init Player--');

		if (Region) {
			this.x = Region.config.player.start.x;
			this.y = Region.config.player.start.y;
		}

		return this;
	},
	load: function (scene) {
		scene.load.atlas(
			'player_walk_forward',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames_walk_forward}?v=${Date.now()}`
		);

		scene.load.atlas(
			'player_walk_backward',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames_walk_backward}?v=${Date.now()}`
		);

		scene.load.atlas(
			'player_walk_left',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames_walk_left}?v=${Date.now()}`
		);

		scene.load.atlas(
			'player_walk_right',
			`${this.sprite.sheet}?v=${Date.now()}`,
			`${this.sprite.frames_walk_right}?v=${Date.now()}`
		);

		return scene;
	},
	create: function (scene) {
		const player = scene.matter.add
			.sprite(this.x, this.y, 'player_walk_' + this.orientation, 'frame_1')
			.setDepth(TYPES.ZINDEX.PLAYER);

		scene.anims.create({
			key: 'walk_forward',
			frames: scene.anims.generateFrameNames('player_walk_forward', {
				prefix: 'frame_',
				start: 1,
				end: 9,
				zeroPad: 1
			}),
			frameRate: 10,
			repeat: -1
		});

		scene.anims.create({
			key: 'walk_backward',
			frames: scene.anims.generateFrameNames('player_walk_backward', {
				prefix: 'frame_',
				start: 1,
				end: 9,
				zeroPad: 1
			}),
			frameRate: 10,
			repeat: -1
		});

		scene.anims.create({
			key: 'walk_left',
			frames: scene.anims.generateFrameNames('player_walk_left', {
				prefix: 'frame_',
				start: 1,
				end: 9,
				zeroPad: 1
			}),
			frameRate: 10,
			repeat: -1
		});

		scene.anims.create({
			key: 'walk_right',
			frames: scene.anims.generateFrameNames('player_walk_right', {
				prefix: 'frame_',
				start: 1,
				end: 9,
				zeroPad: 1
			}),
			frameRate: 10,
			repeat: -1
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
		const _distance = distance(this.instance.x, this.instance.y, toX, toY);
		const _degree = degree(this.instance.x, this.instance.y, toX, toY);
		const orientation = sprite_orientation(_degree);
		const speed = this.getSpeed(_distance);

		this.orientation = orientation;
		this.instance.play('walk_' + orientation);

		this.tween = scene.tweens.add({
			targets: this.instance,
			x: toX,
			y: toY,
			duration: speed,
			onComplete: () => {
				this.instance.stop('walk_' + orientation);
			}
		});
	},
	take: function (item) {
		this.inventory.push(item);
	},
	remove: function (item) {
		this.inventory = this.inventory.filter((i) => i.id != item.id);
	}
};

export default Player;
