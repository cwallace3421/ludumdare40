const global : Global = {
	game: null,
	sprGrp: null,
	uiGrp: null,
}

export default global;

interface Global {
	game : Phaser.Game;
	sprGrp : Phaser.Group;
	uiGrp : Phaser.Group;
}