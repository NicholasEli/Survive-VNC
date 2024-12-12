import TYPES from './types/index.js';
import { distance, out_of_bounds } from './helpers.js';
import toast from './toast.js';

const events = {
	click: function (scene, target) {
		target.on('pointerup', (pointer, targets) => {
			const { x, y } = scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
			const grid = {
				x: Math.round(x / 16) * 16,
				y: Math.round(y / 16) * 16
			};
			const target = targets[0];
			console.clear();
			console.log({ x, y }, grid);

			if (target && target.object && target.object == TYPES.CONTAINERS.CONTAINER) {
				const _distance = distance(Player.instance.x, Player.instance.y, target.x, target.y);

				if (_distance > 200) {
					toast.danger(TYPES.PLAYER.ACTIONS.CLICK.DISTANCE);
					return;
				}

				const is_open = target.data.toggle(scene);

				return target;
			}

			if (out_of_bounds(x, y)) return;

			Player.move(scene, x, y);
			set_attributes();
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

		if ((player_instance && bodies.bodyA.isSensor) || (player_instance && bodies.bodyB.isSensor)) {
			return;
		}

		if (player_instance) {
			Player.moving = false;
			Player.instance.anims.stop();
			Player.tween.stop();
		}
	}
};

export default events;
