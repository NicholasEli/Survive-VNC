import TYPES from '../../types/index.js';
import Containers from '../../containers/index.js';
import Item from '../../items/index.js';

const dumpster1 = Containers[TYPES.CONTAINERS.DUMPSTER]();
dumpster1.x = 700;
dumpster1.y = -125;
dumpster1.inventory = [{ ...Item(TYPES.ITEMS.AXE) }];

const porta_potty1 = Containers[TYPES.CONTAINERS.PORTA_POTTY]();
porta_potty1.x = 600;
porta_potty1.y = -120;
porta_potty1.inventory = [];

const porta_potty2 = Containers[TYPES.CONTAINERS.PORTA_POTTY]();
porta_potty2.x = 800;
porta_potty2.y = -120;
porta_potty2.inventory = [{ ...Item(TYPES.ITEMS.SHOVEL) }];

const trashcan_lobby1 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby1.x = 220;
trashcan_lobby1.y = 270;
trashcan_lobby1.inventory = [];

const trashcan_lobby2 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby2.x = 220;
trashcan_lobby2.y = 540;
trashcan_lobby2.inventory = [];

const trashcan_lobby3 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby3.x = 220;
trashcan_lobby3.y = 770;
trashcan_lobby3.inventory = [];

const trashcan_lobby4 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby4.x = 745;
trashcan_lobby4.y = 790;
trashcan_lobby4.inventory = [];

const trashcan_lobby5 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby5.x = 610;
trashcan_lobby5.y = 310;
trashcan_lobby5.inventory = [];

const trashcan_lobby6 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby6.x = -840;
trashcan_lobby6.y = -750;
trashcan_lobby6.inventory = [];

const trashcan_lobby7 = Containers[TYPES.CONTAINERS.TRASHCAN_LOBBY]();
trashcan_lobby7.x = -840;
trashcan_lobby7.y = 830;
trashcan_lobby7.inventory = [];

const newspaper_machine1 = Containers[TYPES.CONTAINERS.NEWSPAPER_MACHINE]();
newspaper_machine1.x = 800;
newspaper_machine1.y = 790;
newspaper_machine1.inventory = [];

const newspaper_machine2 = Containers[TYPES.CONTAINERS.NEWSPAPER_MACHINE]();
newspaper_machine2.x = 850;
newspaper_machine2.y = 790;
newspaper_machine2.inventory = [];

const sandbox = Containers[TYPES.CONTAINERS.SANDBOX]();
sandbox.x = -700;
sandbox.y = -120;
sandbox.inventory = [];

const log1 = Containers[TYPES.CONTAINERS.LOG]();
log1.x = -300;
log1.y = -720;
log1.inventory = [
	{ ...Item(TYPES.ITEMS.FIREWOOD) },
	{ ...Item(TYPES.ITEMS.FIREWOOD) },
	{ ...Item(TYPES.ITEMS.FIREWOOD) }
];

const log2 = Containers[TYPES.CONTAINERS.LOG]();
log2.x = 325;
log2.y = -780;
log2.inventory = [{ ...Item(TYPES.ITEMS.FIREWOOD) }];

const log3 = Containers[TYPES.CONTAINERS.LOG]();
log3.x = -325;
log3.y = 750;
log3.inventory = [{ ...Item(TYPES.ITEMS.FIREWOOD) }];

const log4 = Containers[TYPES.CONTAINERS.LOG]();
log4.x = -450;
log4.y = 700;
log4.inventory = [{ ...Item(TYPES.ITEMS.FIREWOOD) }, { ...Item(TYPES.ITEMS.FIREWOOD) }];

const rock_pile1 = Containers[TYPES.CONTAINERS.ROCK_PILE]();
rock_pile1.x = -700;
rock_pile1.y = -400;

const rock_pile2 = Containers[TYPES.CONTAINERS.ROCK_PILE]();
rock_pile1.x = -200;
rock_pile1.y = -800;

const bird1 = Containers[TYPES.CONTAINERS.BIRD]();
bird1.x = 10;
bird1.y = -300;

const bird2 = Containers[TYPES.CONTAINERS.BIRD]();
bird2.x = 700;
bird2.y = 290;

const bird3 = Containers[TYPES.CONTAINERS.BIRD]();
bird3.x = -720;
bird3.y = 280;

console.clear();
console.log(bird1);
console.log(bird2);
console.log(bird3);

const containers = [
	bird1,
	bird2,
	bird3,
	dumpster1,
	log1,
	log2,
	log3,
	log4,
	newspaper_machine1,
	newspaper_machine2,
	porta_potty1,
	porta_potty2,
	rock_pile1,
	sandbox,
	trashcan_lobby1,
	trashcan_lobby2,
	trashcan_lobby3,
	trashcan_lobby4,
	trashcan_lobby5,
	trashcan_lobby6,
	trashcan_lobby7
];

export default containers;
