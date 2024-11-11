import Region from './Region.js';
import Player from './Player.js';
import EsterShortPark from './regions/ester-short-park/index.js';
import events from './events.js';

window.onload = async function () {
	console.log('--Init Engine--');

	const canvas = document.getElementById('canvas');
	const region = Region.init(EsterShortPark);
	const player = Player.init();

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const resize = function (scene) {
		scene.scale.resize(window.innerWidth, window.innerHeight);
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

				events.click(this, this.input);

				window.addEventListener('resize', () => resize(this));
				set_attributes();
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
