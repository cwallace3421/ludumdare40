import Pickup from './pickup';
import Searchable from './searchable';
import global from '../global/global';
import keys from '../global/keys';

class Player {

	private speed : number;
	private sprite : Phaser.Sprite;

	constructor(x : number, y : number) {
		this.speed = 200;
		this.createPlayer(x, y);
	}

	private createPlayer(x : number, y : number) {
		this.sprite = global.game.add.sprite(x, y, 'character', 0);
		this.sprite.anchor.set(0.5, 1);
		this.createCollision();
		// Create Shadow
	}

	private createCollision() {
		global.game.physics.arcade.enable(this.sprite);
		this.sprite.body.setSize(this.sprite.width, 6, 0, this.sprite.height - 6);
	}

	public update(delta : number) {
		this.movement(delta);
	}

	public interact(pickups : Pickup[]) {
		for (let i = 0; i < pickups.length; i++) {
			if (global.game.physics.arcade.overlap(this.sprite, pickups[i].getSprite())) {
				pickups[i].toggleHighlight(true);
				if (this.isAnyKeyDown(keys.pickup)) {
					pickups[i].kill();
				}
			} else {
				pickups[i].toggleHighlight(false);
			}
		}
	}

	public collide(searchables : Searchable[]) {
		for (let i = 0; i < searchables.length; i++) {
			if (!searchables[i].isSolid()) {
				continue;
			}

			global.game.physics.arcade.collide(this.sprite, searchables[i].getSprite());
		}
	}

	private movement(delta : number) {
		let dirY = 0;
		dirY -= this.isAnyKeyDown(keys.up) ? 1 : 0;
		dirY += this.isAnyKeyDown(keys.down) ? 1 : 0;

		let dirX = 0;
		dirX -= this.isAnyKeyDown(keys.left) ? 1 : 0;
		dirX += this.isAnyKeyDown(keys.right) ? 1 : 0;

		this.sprite.body.velocity.set((dirX * this.speed), (dirY * this.speed));
	}

	private isAnyKeyDown(keycodes : number[]) {
		for (let i = 0; i < keycodes.length; i++) {
			if (global.game.input.keyboard.isDown(keycodes[i])) {
				return true;
			}
		}
		return false;
	}

	public getSprite() {
		return this.sprite;
	}

}

export default Player;
