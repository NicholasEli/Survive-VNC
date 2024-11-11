import environment from './environment.js';
import foreground_bounds from './foreground-bounds.js';
import containers from './containers.js';

const width = 2240;
const height = 2240;

const EsterShortPark = {
	id: 'ester-short-park',
	name: 'Ester Short Park',
	width,
	height,
	player: {
		start: {
			x: 600,
			y: 400
		}
	},
	map: {
		src: '/assets/environment/ester-short-park.png'
	},
	environment: {
		foreground: {
			src: '/assets/environment/ester-short-park-foreground.png',
			bounds: foreground_bounds
		},
		background: {
			src: '/assets/environment/ester-short-park-background.png'
		},
		containers
	}
};

export default EsterShortPark;
