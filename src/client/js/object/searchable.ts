abstract class Searchable {
	abstract getSprite() : Phaser.Sprite;
	abstract getTrigger() : Phaser.Sprite;
	abstract isEmpty() : boolean;
	abstract isSolid() : boolean;
}

export default Searchable;