const toast = {
	success: function (text) {
		Toastify({
			text,
			duration: 5000,
			gravity: 'bottom',
			position: 'center',
			style: {
				background: 'var(--green-100)'
			}
		}).showToast();
	},
	info: function (text) {
		Toastify({
			text,
			duration: 5000,
			gravity: 'bottom',
			position: 'center',
			style: {
				background: 'var(--blue-700)'
			}
		}).showToast();
	},
	warning: function (text) {
		Toastify({
			text,
			duration: 5000,
			gravity: 'bottom',
			position: 'center',
			style: {
				background: 'var(--yellow-300)'
			}
		}).showToast();
	},
	danger: function (text) {
		Toastify({
			text,
			duration: 5000,
			gravity: 'bottom',
			position: 'center',
			style: {
				background: 'var(--red-500)'
			}
		}).showToast();
	}
};

export default toast;
