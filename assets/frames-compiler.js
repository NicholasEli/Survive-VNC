console.clear();
//"frame_1": { "frame": { "x": 16, "y": 648, "w": 32, "h": 56 }, "group": "move_forward" },

const dims = 64;
const column_length = 13;
let column_index = 0;

const row_length = 20;
let row_index = 0;

const frames = {};
const total_frames = row_length * column_length;
const frame_index = 0;

const directions = ['backwards', 'left', 'forwards', 'right'];
let direction_index = 0;

const actions = ['stop', 'pull', 'move', 'grab', 'fight'];
let action_index = 0;

const limit = {
	stop: 7,
	pull: 8,
	move: 9,
	grab: 6,
	fight: 13
};

console.log({ total_frames });

for (let i = 0; i < total_frames + 1; i++) {
	frames['frame_' + i] = {
		frame: {
			x: column_index * dims,
			y: row_index * dims,
			w: dims,
			h: dims
		},
		group: `${actions[action_index]}_${directions[direction_index]}`
	};

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

console.log(frames);
console.log(JSON.stringify(frames));
