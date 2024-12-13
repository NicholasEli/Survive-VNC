import TYPES from './types/index.js';
import Player from './Player.js';

set_attributes = function () {
	if (!Player) return;
	for (let attribute in Player.attributes) {
		const container = document.querySelector(`[data-attribute="${attribute}"]`);

		if (container && container.querySelector('span')) {
			container.querySelector('span').innerText = Player.attributes[attribute];
		}

		if (container && container.querySelector('div')) {
			container.querySelector('div').style.width = Player.attributes[attribute] + '%';
		}

		if (container && attribute == 'temperature') {
			if (Player.attributes[attribute] < 70) {
				container.classList.remove('hidden');
			} else {
				container.classList.add('hidden');
			}
		}

		if (container && attribute == 'illness') {
			if (Player.attributes[attribute] != TYPES.ILLNESS.HEALTHY) {
				container.classList.remove('hidden');
			} else {
				container.classList.add('hidden');
			}
		}
	}
};
