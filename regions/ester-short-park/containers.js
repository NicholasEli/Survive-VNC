import TYPES from '../../types/index.js';
import Containers from '../../containers/index.js';
import Item from '../../items/index.js';

const dumpster1 = Containers[TYPES.CONTAINERS.DUMPSTER]();
dumpster1.x = 352;
dumpster1.y = -56;
dumpster1.inventory = [{ ...Item(TYPES.ITEMS.AXE) }];

const porta_potty1 = Containers[TYPES.CONTAINERS.PORTA_POTTY]();
porta_potty1.x = -320;
porta_potty1.y = 90;
porta_potty1.inventory = [];

const porta_potty2 = Containers[TYPES.CONTAINERS.PORTA_POTTY]();
porta_potty2.x = -288;
porta_potty2.y = 90;
porta_potty2.inventory = [{ ...Item(TYPES.ITEMS.SHOVEL) }];

const trashcan_lobby1 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby1.x = 232;
trashcan_lobby1.y = 180;
trashcan_lobby1.inventory = [];

const trashcan_lobby2 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby2.x = 170;
trashcan_lobby2.y = 180;
trashcan_lobby2.inventory = [];

const trashcan_lobby3 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby3.x = -340;
trashcan_lobby3.y = -350;
trashcan_lobby3.inventory = [];

const trashcan_lobby4 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby4.x = 136;
trashcan_lobby4.y = 276;
trashcan_lobby4.inventory = [];

const trashcan_lobby5 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby5.x = 136;
trashcan_lobby5.y = 356;
trashcan_lobby5.inventory = [];

const trashcan_lobby6 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby6.x = 328;
trashcan_lobby6.y = 356;
trashcan_lobby6.inventory = [];

const trashcan_lobby7 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby7.x = -328;
trashcan_lobby7.y = -28;
trashcan_lobby7.inventory = [];

const log1 = Containers[TYPES.CONTAINERS.LOG]();
log1.x = -208;
log1.y = -256;
log1.inventory = [
	{ ...Item(TYPES.ITEMS.FIREWOOD) },
	{ ...Item(TYPES.ITEMS.FIREWOOD) },
	{ ...Item(TYPES.ITEMS.FIREWOOD) }
];

const log2 = Containers[TYPES.CONTAINERS.LOG]();
log2.x = -80;
log2.y = -320;
log2.inventory = [{ ...Item(TYPES.ITEMS.FIREWOOD) }];

const log3 = Containers[TYPES.CONTAINERS.LOG]();
log3.x = 320;
log3.y = -176;
log3.inventory = [{ ...Item(TYPES.ITEMS.FIREWOOD) }];

const log4 = Containers[TYPES.CONTAINERS.LOG]();
log4.x = 240;
log4.y = -336;
log4.inventory = [{ ...Item(TYPES.ITEMS.FIREWOOD) }, { ...Item(TYPES.ITEMS.FIREWOOD) }];

const rock_pile1 = Containers[TYPES.CONTAINERS.ROCK_PILE]();
rock_pile1.x = -256;
rock_pile1.y = -144;

const rock_pile2 = Containers[TYPES.CONTAINERS.ROCK_PILE]();
rock_pile2.x = -96;
rock_pile2.y = -16;

const bird1 = Containers[TYPES.CONTAINERS.BIRD]();
bird1.x = 112;
bird1.y = 280;

const bird2 = Containers[TYPES.CONTAINERS.BIRD]();
bird2.x = 352;
bird2.y = 360;

const bird3 = Containers[TYPES.CONTAINERS.BIRD]();
bird3.x = 224;
bird3.y = 448;

const water = Containers[TYPES.CONTAINERS.WATER]();
water.width = 32;
water.height = 90;
water.x = 345;
water.y = 132;

export default [
	bird1,
	bird2,
	bird3,
	dumpster1,
	log1,
	log2,
	log3,
	log4,
	porta_potty1,
	porta_potty2,
	rock_pile1,
	rock_pile2,
	trashcan_lobby1,
	trashcan_lobby2,
	trashcan_lobby3,
	trashcan_lobby4,
	trashcan_lobby5,
	trashcan_lobby6,
	trashcan_lobby7,
	water
];
