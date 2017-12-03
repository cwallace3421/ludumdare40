import Searchable from './searchable';
import global from '../global/global';
import utils from '../global/utils';

class Crate extends Searchable {

	private sprite : Phaser.Sprite;
	private trigger : Phaser.Sprite;
	private tall : boolean;

	constructor(x : number, y : number, tall : boolean) {
		super();
		this.createCrate(x, y, tall ? 'crate_tall' : 'crate_small');
	}

	private createCrate(x : number, y : number, key : string) {
		this.sprite = global.game.add.sprite(x, y, key, 0, global.sprGrp);
		this.sprite.anchor.set(0.5, 1);
		this.createCollision();
		this.createTrigger();
		const shadow = global.game.add.sprite(0, 3, 'crate_shadow');
		shadow.anchor.set(0.5, 1);
		this.sprite.addChild(shadow);
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

	private createTrigger() {
		const padding = 10;
		this.trigger = global.game.add.sprite(0, 0, undefined);
		this.trigger.anchor.setTo(0.5, 1);
		this.trigger.width = utils.scale(this.sprite.width + (padding * 2));
		this.trigger.height = utils.scale(this.sprite.width + (padding * 2));
		this.trigger.position.y = padding;
		this.sprite.addChild(this.trigger);
		global.game.physics.arcade.enable(this.trigger);
	}

	public isEmpty() {
		return false;
	}

	public isSolid() {
		return true;
	}

	public getTrigger() {
		return this.trigger;
	}

	public getSprite() {
		return this.sprite;
	}

}

export default Crate;