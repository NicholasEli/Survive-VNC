import TYPES from './types/index.js';
import Containers from './containers/index.js';

Region = {
	config: null,
	init: function (region) {
		if (!region) return null;

		this.config = region;

		console.log(`--Init Region (${region.name})--`);

		return this;
	},
	load: function (scene) {
		scene.load.image('map', `${this.config.map.src}?v=${Date.now()}`).on('error', () => {
			console.error('Error loading background image');
		});

		if (this.config.environment.foreground.src) {
			scene.load
				.image('foreground', `${this.config.environment.foreground.src}?v=${Date.now()}`)
				.on('error', () => {
					console.error('Error loading foreground image');
				});
		}

		if (this.config.environment.background.src) {
			scene.load
				.image('background', `${this.config.environment.background.src}?v=${Date.now()}`)
				.on('error', () => {
					console.error('Error loading background image');
				});
		}

		this.config.environment.containers.forEach((container) => {
			container.load(scene);
		});
	},
	create: function (scene) {
		const { width, height } = this.config;
		scene.add.image(0, 0, 'map').setDepth(TYPES.ZINDEX.MAP);
		scene.add.image(0, 0, 'foreground').setDepth(TYPES.ZINDEX.FOREGROUND);
		scene.add.image(0, 0, 'background').setDepth(TYPES.ZINDEX.BACKGROUND);

		scene.matter.add.rectangle(0, height / -2, width, 10, { isStatic: true }); // Top boundary
		scene.matter.add.rectangle(0, height / 2, width, 10, { isStatic: true }); // Bottom boundary
		scene.matter.add.rectangle(width / -2, 0, 10, height, { isStatic: true }); // Left boundary
		scene.matter.add.rectangle(width / 2, 0, 10, height, { isStatic: true }); // Right boundary

		this.config.environment.foreground.bounds.forEach((bounds) => {
			scene.matter.add.rectangle(bounds.x, bounds.y, bounds.width, bounds.height, {
				isStatic: true,
				name: bounds.name
			});
		});

		this.config.environment.containers.forEach((container, index) => {
			if (container.direct_insert) {
				delete container.direct_insert;
				container.create(scene, true);
			} else {
				container.create(scene);
			}
		});

		return { scene };
	}
};

export default Region;
