(() => {
	console.clear();
	//"frame_1": { "frame": { "x": 16, "y": 648, "w": 32, "h": 56 }, "group": "move_forward" },

	// Frame width height of character
	const dims = 64;

	// Number of frames wide
	const column_length = 13;
	let column_index = 0;

	// Number of frames tall
	const row_length = 20;
	let row_index = 0;

	// Total area of frames
	const frames = {};
	const total_frames = row_length * column_length;
	const frame_index = 0;

	const directions = ['backwards', 'left', 'forwards', 'right'];
	let direction_index = 0;

	// Named groups on sprite sheet, can be renamed - stops 20 (naked character)
	const actions = ['stop', 'pull', 'move', 'grab', 'fight'];
	let action_index = 0;

	// Number of frames in each sprite group (ex: walk directions are 7 frames wide)
	const limit = {
		stop: 6,
		pull: 7,
		move: 8,
		grab: 5,
		fight: 12
	};

	for (let i = 0; i < total_frames; i++) {
		const action = actions[action_index];

		const x_squeeze = 16; // shrinks x area around character
		const y_squeeze = 8; // shrinks y area around character
		if (column_index <= limit[action]) {
			frames['frame_' + i] = {
				frame: {
					x: column_index * dims + x_squeeze,
					y: row_index * dims + y_squeeze,
					w: dims - x_squeeze * 2,
					h: dims - y_squeeze
				},
				group: `${actions[action_index]}_${directions[direction_index]}`
			};
		}

		column_index++;
		if (column_index >= column_length) {
			column_index = 0;
			row_index++;
			direction_index++;
		}

		if (!directions[direction_index]) {
			direction_index = 0;
			action_index++;
		}
	}

	// Output
	// Beautify here so formatter doesn't crash https://jsonformatter.org/
	console.log(frames);
	console.log(JSON.stringify({ frames }));
})();
