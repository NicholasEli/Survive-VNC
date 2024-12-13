/**
 * Renders an array of template paths
 * @param { array } template_paths - array of template source paths
 */
export const get_templates = async function (template_paths) {
	let index = 0;
	const _render_template = async function () {
		if (index >= template_paths.length) return;

		const _get_template = function () {
			return new Promise((resolve) => {
				return htmx
					.ajax('GET', template_paths[index], { target: 'main', swap: 'beforeend' })
					.then(() => resolve());
			});
		};

		await _get_template();

		index++;
		await _render_template();
	};

	await _render_template();
};

export const ran_num = function (limit = 10) {
	return Math.floor(Math.random() * limit) + 1;
};

/**
 * Generate UUI
 * @return { string } random string of characters and number
 */
export const uuid = function () {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};

	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};

/**
 * Determines if x and y are out of map bounds
 */

export const out_of_bounds = function (x, y) {
	if (!Region) return;

	const { width, height } = Region.config;
	const x_limit = width / 2;
	const y_limit = height / 2;

	if (x < x_limit * -1 || x > x_limit) return true;
	if (y < y_limit * -1 || y > y_limit) return true;

	return false;
};
/**
 * Determines what degree point is heading depending on direction
 * 0/360 being right center of the viewport
 * @param { number } fromX - current grid x value
 * @param { number } fromY - current grid y value
 * @param { number } toX - target grid x value
 * @param { number } toY - target grid y value
 * @return { number | null } degree value or null
 */
export const degree = function (fromX, fromY, toX, toY) {
	const xDiff = toX - fromX;
	const yDiff = toY - fromY;

	const degrees = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI + 180;

	return degrees;
};

export const sprite_orientation = function (degrees) {
	if (degrees > 325) return 'right';
	if (degrees > 215) return 'backwards';
	if (degrees > 125) return 'left';
	if (degrees < 65) return 'right';

	return 'forwards';
};

/**
 * Distance between two points based on distance from target
 * @param { number } fromX - current grid x value
 * @param { number } fromY - current grid y value
 * @param { number } toX - target grid x value
 * @param { number } toY - target grid y value
 * @return the difference between to.x - from.x or to.y - from.x depending which is greater
 */
export const distance = function (fromX, fromY, toX, toY) {
	const xDiff = Math.abs(toX - fromX);
	const yDiff = Math.abs(toY - fromY);

	if (xDiff > yDiff) return xDiff;
	if (yDiff > xDiff) return yDiff;

	return xDiff;
};

/** Determines if the player has the correct inventory items to open the container
 * @param { object } container - container to be opened
 */
export const is_container_locked = function (container) {
	const total_requirements = container.requirements.length;
	const requirements_met = container.requirements.filter((requirement) => {
		const player_inventory = Player.inventory.findIndex((r) => r.type == requirement);
		if (player_inventory > -1) return requirement;
	}).length;

	if (container.locked && total_requirements != requirements_met) return true;
	return false;
};

/**
 * Asynchrounus timeout
 * @param { number } ms - wait time in milliseconds
 * @return { promise } after milliseconds
 */
export const async_timeout = function (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
