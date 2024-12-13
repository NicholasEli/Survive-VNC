const sleeping_bag = function (item) {
	item.use = function () {
		Player.health(25);
	};

	item.value = 25;

	return item;
};

export default sleeping_bag;
