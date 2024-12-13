import TYPES from '../types/index.js';
import toast from '../toast.js';
import inventory from './inventory.js';

const container = {
	ui: function () {
		if (!Container) return;

		const title = document.querySelector('[data-el="container-title"]');
		let title_text = Container.name.replace(/_/g, ' ');

		if (Container.capacity >= 9999) {
			title_text = title_text + ` (${Container.capacity} / ${Container.capacity})`;
		} else {
			title_text = title_text + ` (${Container.inventory.length} / ${Container.capacity})`;
		}

		title.innerText = title_text;

		const wrapper = document.querySelector('[data-el="container-items"]');
		wrapper.innerHTML = '';

		Container.inventory.forEach((item) => {
			if (!item) return;
			const btn = document.createElement('button');
			const image = document.createElement('img');
			const take_span = document.createElement('span');

			btn.classList.add('container__item');
			btn.title = item.type.replace(/_/g, ' ');
			btn.setAttribute('data-container-item', item.id);
			if (!TYPES.CONSUMABLE[item.type]) btn.setAttribute('data-item-cnd', 'CND: ' + item.condition);

			image.src = TYPES.SOURCE[item.type];

			btn.append(image);
			btn.append(take_span);
			wrapper.appendChild(btn);

			btn.addEventListener('click', () => {
				if (Player.inventory.length + 1 > Player.capacity()) {
					toast.danger(TYPES.TOAST.PLAYER.INVENTORY.FULL);
					return;
				}

				Container.remove(item);
				Player.take(item);

				if (Container.illness) Player.actions(Container.illness);

				this.ui();
				inventory.ui();
				set_attributes();

				if (Container.inventory.length <= 0 && Container.consumable && Container.instance.body) {
					Container.instance.scene.matter.world.remove(Container.instance.body);
					Container.instance.destroy();
				}
			});
		});
	}
};

export default container;
