import Pickup from './pickup';
import Searchable from './searchable';
import global from '../global/global';
import keys from '../global/keys';
import utils from '../global/utils';

class Player {

	private speed : number;
	private sprite : Phaser.Sprite;

	constructor(x : number, y : number) {
		this.speed = 200;
		this.createPlayer(x, y);
	}

	private createPlayer(x : number, y : number) {
		this.sprite = global.game.add.sprite(x, y, 'character', 0, global.sprGrp);
		this.sprite.anchor.set(0.5, 1);
		this.createCollision();
		// Create Shadow
	}

	private createCollision() {
		global.game.physics.arcade.enable(this.sprite);
		this.sprite.body.setSize(
			utils.scale(this.sprite.width),
			utils.scale(6),
			utils.scale(0) - (this.sprite.anchor.x * (this.sprite.width / 2)),
			(utils.scale(this.sprite.height) - utils.scale(6)) - (this.sprite.anchor.y * (this.sprite.height / 2)),
		);
	}

	public update(delta : number) {
		this.movement(delta);
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

	public interact(pickups : Pickup[], searchables : Searchable[]) {
		for (let i = 0; i < pickups.length; i++) {
			if (pickups[i].isAlive()) {
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

		for (let i = 0; i < searchables.length; i++) {
			if (!searchables[i].isEmpty()) {
				if (global.game.physics.arcade.overlap(this.sprite, searchables[i].getTrigger())) {
					// Show on ui
					if (this.isAnyKeyDown(keys.search)) {
						console.log('looting');
						global.ui.pingMessage('Crate empty');
					}
				}
			}
		}
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
