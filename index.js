import Region from './Region.js';
import Player from './Player.js';
import EsterShortPark from './regions/ester-short-park/index.js';
import events from './events.js';
import { async_timeout, get_templates } from './helpers.js';
import TYPES from './types/index.js';

window.onload = async function () {
	console.log('--Init Engine--');

	const template_paths = Object.keys(TYPES.TEMPLATES).map((template) => TYPES.TEMPLATES[template]);
	const templates = await get_templates(template_paths);

	const canvas = document.getElementById('canvas');
	const region = Region.init(EsterShortPark);
	const player = Player.init();

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const resize = function (scene) {
		scene.scale.resize(window.innerWidth, window.innerHeight);
	};

	const lifecycle = async function () {
		if (!Player) return;
		await async_timeout(10000);

		Player.illness();
		Player.hunger();
		Player.thirst();
		set_attributes();
		lifecycle();
	};

	Game = new Phaser.Game({
		parent: 'canvas',
		type: Phaser.AUTO,
		width: canvas.width,
		height: canvas.height,
		scene: {
			preload: function () {
				this.load.setBaseURL(window.location.origin);

				region.load(this);
				player.load(this);
			},
			create: function () {
				this.id = 'scene';

				const _region = region.create(this);
				player.create(this);

				this.matter.world.on('collisionstart', function (event) {
					event.pairs.forEach(function (bodies) {
						events.collision(this, bodies);
					});
				});

				this.cameras.main.startFollow(player.instance);
				this.cameras.main.setZoom(2.5);

				events.click(this, this.input);

				window.addEventListener('resize', () => resize(this));
				set_attributes();

				lifecycle();
			},
			update: function () {}
		},
		backgroundColor: '#3c4255',
		physics: {
			default: 'matter',
			matter: {
				gravity: { y: 0 },
				debug: true
			}
		},
		scale: {
			mode: Phaser.Scale.NONE,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			zoom: 1
		},
		render: {
			pixelArt: true
		}
	});
};
