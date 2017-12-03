const global : Global = {
	game: null,
	sprGrp: null,
	uiGrp: null,
	font: null,
}

export default global;

interface Global {
	game : Phaser.Game;
	sprGrp : Phaser.Group;
	uiGrp : Phaser.Group;
	font : Phaser.RetroFont;
}