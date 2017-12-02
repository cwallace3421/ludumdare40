import Searchable from './searchable';
import global from '../global/global';
import utils from '../global/utils';

class Crate extends Searchable {

	private sprite : Phaser.Sprite;

	constructor(x : number, y : number, tall : boolean) {
		super();
		this.createCrate(x, y, tall ? 'crate_tall' : 'crate_small');
	}

	private createCrate(x : number, y : number, key : string) {
		this.sprite = global.game.add.sprite(x, y, key, 0, global.sprGrp);
		this.sprite.anchor.set(0.5, 1);
		this.createCollision();
	}

	private createCollision() {
		global.game.physics.arcade.enable(this.sprite);
		this.sprite.body.setSize(
			utils.scale(this.sprite.width),
			utils.scale(this.sprite.width),
			utils.scale(0) - (this.sprite.anchor.x * (this.sprite.width / 2)),
			(utils.scale(this.sprite.height) - utils.scale(this.sprite.width)) - (this.sprite.anchor.y * (this.sprite.height / 2)),
		);
		this.sprite.body.immovable = true;
	}

	public isSolid() {
		return true;
	}

	public getSprite() {
		return this.sprite;
	}

}

export default Crate;