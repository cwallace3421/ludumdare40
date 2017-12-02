import Searchable from './searchable';
import global from '../global/global';

class Crate extends Searchable {

	private sprite : Phaser.Sprite;

	constructor(x : number, y : number, tall : boolean) {
		super();
		this.createCrate(x, y, tall ? 'crate_tall' : 'crate_small');
	}

	private createCrate(x : number, y : number, key : string) {
		this.sprite = global.game.add.sprite(x, y, key);
		this.sprite.anchor.set(0.5, 1);
		this.createCollision();
	}

	private createCollision() {
		global.game.physics.arcade.enable(this.sprite);
		this.sprite.body.immovable = true;
		this.sprite.body.setSize(this.sprite.width, this.sprite.width, 0, this.sprite.height - this.sprite.width);
	}

	public isSolid() {
		return true;
	}

	public getSprite() {
		return this.sprite;
	}

}

export default Crate;