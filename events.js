import TYPES from './types/index.js';
import { distance } from './helpers.js';
import toast from './toast.js';

const events = {
	click: function (scene, target) {
		target.on('pointerup', (pointer, targets) => {
			const { x, y } = scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
			const target = targets[0];

			if (target && target.object && target.object == TYPES.CONTAINERS.CONTAINER) {
				const _distance = distance(Player.instance.x, Player.instance.y, target.x, target.y);

				if (_distance > 200) {
					toast.danger(TYPES.PLAYER.ACTIONS.CLICK.DISTANCE);
					return;
				}

				const is_open = target.data.toggle(scene);

				return target;
			}

			Player.move(scene, x, y);
			return null;
		});
	},
	collision: function (scene, bodies) {
		let player_instance = null;

		if (bodies.bodyA.gameObject && bodies.bodyA.gameObject.id == 'player' && Player.tween) {
			player_instance = bodies.bodyA.gameObject;
		}

		if (bodies.bodyB.gameObject && bodies.bodyB.gameObject.id == 'player' && Player.tween) {
			player_instance = bodies.bodyB.gameObject;
		}

		if (player_instance) {
			Player.instance.anims.stop();
			Player.tween.stop();
		}
	}
};

export default events;
