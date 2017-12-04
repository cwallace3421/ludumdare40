abstract class Searchable {
	abstract loot() : number;
	abstract hasBeenLooted() : boolean;
	abstract getSprite() : Phaser.Sprite;
	abstract getTrigger() : Phaser.Sprite;
	abstract isSolid() : boolean;
	abstract toggleHighlight(visible : boolean) : void;
}

export default Searchable;