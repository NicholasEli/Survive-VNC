const rag = function (item) {
	item.use = function () {
		Player.remove(item);
		Player.actions(TYPES.ACTIONS.WRAP_SPRAIN);
	};

	return item;
};

export default rag;
