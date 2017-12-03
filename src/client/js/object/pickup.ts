import global from '../global/global';
import types from '../global/types';
import utils from '../global/utils';

class Pickup {

	private id : number;
	private alive : boolean;
	private sprite : Phaser.Sprite;
	private highlight : Phaser.Sprite;
	private type : number;

	constructor(x : number, y : number) {
		this.alive = true;

		const chance = Math.random();
		if (chance <= 0.1) {
			this.type = 3;
		} else if (chance <= 0.2) {
			this.type = 2;
		} else {
			this.type = 1;
		}
		this.createPickup(x, y);
	}

	private createPickup(x : number, y : number) {
		const variation = utils.randomIntFromInterval(0, 2);
		this.sprite = global.game.add.sprite(x, y, 'pickup', ((this.type - 1) * 4) + variation , global.decGrp);
		this.sprite.anchor.set(0.5);

		this.highlight = global.game.add.sprite(x, y + 2, 'pickup_highlight', 0, global.decGrp);
		this.highlight.anchor.set(0.5);
		this.highlight.visible = false;

		this.createCollision();
	}

	private createCollision() {
		global.game.physics.arcade.enable(this.sprite);
		const radius = this.sprite.width / 2;
		this.sprite.body.setCircle(
			utils.scale(radius),
			utils.scale(0) - (this.sprite.anchor.x * this.sprite.width),
			utils.scale(0) - (this.sprite.anchor.y * this.sprite.width)
		);
	}

	public toggleHighlight(visible : boolean) {
		this.highlight.visible = visible;
	}

	public kill() {
		this.sprite.destroy();
		this.highlight.destroy();
		this.type = 0;
		this.alive = false;
	}

	public isAlive() {
		return this.alive;
	}

	public getSprite() {
		return this.sprite;
	}

	public getType() {
		return this.type;
	}

}

export default Pickup;