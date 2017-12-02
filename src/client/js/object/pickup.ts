import global from '../global/global';
import utils from '../global/utils';

class Pickup {

	private id : number;
	private alive : boolean;
	private sprite : Phaser.Sprite;
	private highlight : Phaser.Sprite;

	constructor(x : number, y : number, id? : number) {
		this.id = id ? id : utils.randomIntFromInterval(0, 9999999);
		this.alive = true;
		this.createPickup(x, y);
	}

	private createPickup(x : number, y : number) {
		this.sprite = global.game.add.sprite(x, y, 'pickup', 0, global.sprGrp);
		this.sprite.anchor.set(0.5);

		this.highlight = global.game.add.sprite(x, y, 'pickup_highlight', 0, global.sprGrp);
		this.highlight.anchor.set(0.5);
		this.highlight.visible = false;

		this.createCollision();
	}

	private createCollision() {
		global.game.physics.arcade.enable(this.sprite);
		const radius = this.sprite.width / 2;
		this.sprite.body.setCircle(
			utils.scale(radius),
			utils.scale(0) - (this.sprite.anchor.x * (this.sprite.width / 2)),
			(utils.scale(this.sprite.height) - utils.scale(radius) * 2) - (this.sprite.anchor.y * (this.sprite.height / 2))
		);
	}

	public toggleHighlight(visible : boolean) {
		this.highlight.visible = visible;
	}

	public kill() {
		this.sprite.destroy();
		this.highlight.destroy();
		this.alive = false;
	}

	public isAlive() {
		return this.alive;
	}

	public getSprite() {
		return this.sprite;
	}

}

export default Pickup;