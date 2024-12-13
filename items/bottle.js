const bottle = function (item) {
	item.use = function () {
		const water = Player.inventory.find((item) => item.type == TYPES.ITEMS.WATER);

		if (!water) {
			toast.danger(TYPES.TOAST.ITEM.MISSING.WATER);
			return null;
		}

		Player.remove(water);
		Player.setAttribute(TYPES.PLAYER.ATTRIBUTES.THIRST, 10);
	};

	return item;
};

export default bottle;
