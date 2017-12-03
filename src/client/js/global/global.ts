import UI from '../object/ui';

const global : Global = {
	game: null,
	sprGrp: null,
	uiGrp: null,
	ui: null,
	countdownAmount: 3 * 60 + 1,
	scale: 1.5,
	roomW: 3000,
	roomH: 2000,
	wallH: 252,
}

export default global;

interface Global {
	game : Phaser.Game;
	sprGrp : Phaser.Group;
	uiGrp : Phaser.Group;
	ui : UI;
	countdownAmount : number;
	scale : number;
	roomW : number;
	roomH : number;
	wallH : number;
}