abstract class Searchable {
	abstract loot() : number;
	abstract hasBeenLooted() : boolean;
	abstract getSprite() : Phaser.Sprite;
	abstract getTrigger() : Phaser.Sprite;
	abstract isSolid() : boolean;
}

export default Searchable;