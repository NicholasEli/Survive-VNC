/**
 * Generate UUI
 * return { string } random string of characters and number
 */
export const uuid = function () {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};

	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
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
	if (degrees >= 225 && degrees <= 315) return 'backward';
	if (degrees >= 125 && degrees < 225) return 'left';
	if (degrees > 315 || (degrees >= 0 && degrees <= 45)) return 'right';

	return 'forward';
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
