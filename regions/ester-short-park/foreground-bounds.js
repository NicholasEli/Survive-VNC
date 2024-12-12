const buildings = [
	{
		width: 115,
		height: 30,
		x: 0,
		y: -120
	},
	{
		width: 40,
		height: 32,
		x: 240,
		y: 304
	},
	{
		width: 52,
		height: 36,
		x: -80,
		y: 320
	},
	// Main Building
	{
		width: 120,
		height: 80,
		x: -256,
		y: 240
	},
	{
		width: 16,
		height: 32,
		x: -312,
		y: 312
	},
	{
		width: 64,
		height: 16,
		x: -224,
		y: 320
	},
	{
		width: 16,
		height: 32,
		x: -200,
		y: 312
	}
];

const trees = [
	// Big Trees
	{
		width: 4,
		height: 4,
		x: -140,
		y: -16
	},
	{
		width: 4,
		height: 4,
		x: -268,
		y: -160
	},
	{
		width: 4,
		height: 4,
		x: -172,
		y: 336
	},
	{
		width: 4,
		height: 4,
		x: -124,
		y: -320
	},
	{
		width: 4,
		height: 4,
		x: -284,
		y: -320
	},
	{
		width: 4,
		height: 4,
		x: 116,
		y: 32
	},
	{
		width: 4,
		height: 4,
		x: -124,
		y: -320
	},
	{
		width: 4,
		height: 4,
		x: 100,
		y: -336
	},
	{
		width: 4,
		height: 4,
		x: 276,
		y: -336
	},
	{
		width: 4,
		height: 4,
		x: 324,
		y: -208
	},
	{
		width: 4,
		height: 4,
		x: 260,
		y: -128
	},
	// Small Trees
	{
		width: 24,
		height: 4,
		x: -240,
		y: -275
	},
	{
		width: 24,
		height: 4,
		x: -175,
		y: -260
	},
	{
		width: 24,
		height: 4,
		x: -65,
		y: 30
	},
	{
		width: 24,
		height: 4,
		x: 48,
		y: 110
	},
	{
		width: 24,
		height: 4,
		x: 208,
		y: -320
	},
	{
		width: 24,
		height: 4,
		x: 208,
		y: -320
	},
	{
		width: 24,
		height: 4,
		x: 160,
		y: -272
	},
	{
		width: 24,
		height: 4,
		x: 336,
		y: -112
	},
	// Planter
	{
		width: 64,
		height: 4,
		x: 200,
		y: 140
	},
	{
		width: 64,
		height: 4,
		x: 88,
		y: 256
	},
	{
		width: 64,
		height: 4,
		x: 88,
		y: 336
	},
	{
		width: 16,
		height: 4,
		x: 352,
		y: 336
	}
];

const objects = [
	// Long Bench
	{
		width: 32,
		height: 4,
		x: 200,
		y: 180
	},
	// Short Bench
	{
		width: 8,
		height: 16,
		x: 132,
		y: 328
	},
	{
		width: 8,
		height: 16,
		x: 132,
		y: 248
	},
	{
		width: 8,
		height: 16,
		x: 328,
		y: 328
	},
	// Swing Set
	{
		width: 60,
		height: 12,
		x: -280,
		y: -76
	},
	// Lamp Posts
	{
		width: 4,
		height: 4,
		x: -232,
		y: 16
	},
	{
		width: 4,
		height: 4,
		x: -56,
		y: -208
	},
	{
		width: 4,
		height: 4,
		x: 56,
		y: -208
	},
	{
		width: 4,
		height: 4,
		x: 264,
		y: -48
	},
	{
		width: 4,
		height: 4,
		x: 56,
		y: 192
	},
	{
		width: 4,
		height: 4,
		x: -40,
		y: 192
	},
	// Statue
	{
		width: 4,
		height: 4,
		x: 0,
		y: -320
	},
	// Bush
	{
		width: 16,
		height: 4,
		x: 0,
		y: -220
	},
	{
		width: 16,
		height: 4,
		x: 0,
		y: -252
	},
	{
		width: 16,
		height: 4,
		x: 0,
		y: -284
	},
	// Water Feature
	{
		width: 32,
		height: 96,
		x: 344,
		y: 128
	}
];

const foreground_bounds = [...trees, ...buildings, ...objects];
export default foreground_bounds;
