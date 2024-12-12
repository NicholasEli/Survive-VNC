import foreground_bounds from './foreground-bounds.js';
import containers from './containers.js';

const width = 960;
const height = 960;

const EsterShortPark = {
	id: 'ester-short-park',
	name: 'Ester Short Park',
	width,
	height,
	player: {
		start: {
			x: 0,
			y: 0
		}
	},
	map: {
		src: '/assets/environment/ester-short-park/ground.png'
	},
	environment: {
		foreground: {
			src: '/assets/environment/ester-short-park/foreground.png',
			bounds: foreground_bounds
		},
		background: {
			src: '/assets/environment/ester-short-park/background.png'
		},
		containers
	}
};

export default EsterShortPark;
