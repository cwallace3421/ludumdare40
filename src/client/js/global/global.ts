import UI from '../object/ui';

const global : Global = {
	game: null,
	sprGrp: null,
	uiGrp: null,
	decGrp: null,
	ui: null,
	countdownAmount: 3 * 60 + 1,
	scale: 2,
	roomW: 2000,
	roomH: 2000,
	wallH: 252,
	glasses: 0,
}

export default global;

interface Global {
	game : Phaser.Game;
	sprGrp : Phaser.Group;
	uiGrp : Phaser.Group;
	decGrp : Phaser.Group;
	ui : UI;
	countdownAmount : number;
	scale : number;
	roomW : number;
	roomH : number;
	wallH : number;
	glasses : number;
}