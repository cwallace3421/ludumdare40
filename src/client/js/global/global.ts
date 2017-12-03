import UI from '../object/ui';

const global : Global = {
	game: null,
	sprGrp: null,
	uiGrp: null,
	ui: null,
}

export default global;

interface Global {
	game : Phaser.Game;
	sprGrp : Phaser.Group;
	uiGrp : Phaser.Group;
	ui : UI;
}