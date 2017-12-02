import global from '../global/global';
import keys from '../global/keys';

class Player {

	private speed : number;
	private sprite : Phaser.Sprite;

	constructor(x : number, y : number) {
		this.speed = 5;
		this.createPlayer(x, y);
	}

	private createPlayer(x : number, y : number) {
		this.sprite = global.game.add.sprite(x, y, 'character', 0);
		this.sprite.anchor.set(0.5, 1);
		// Create Shadow
	}

	public update(delta : number) {
		this.movement(delta);
	}

	private movement(delta : number) {
		if (this.isAnyKeyDown(keys.up)) {
			this.sprite.position.y -= this.speed * delta;
		} else if (this.isAnyKeyDown(keys.down)) {
			this.sprite.position.y += this.speed * delta;
		}

		if (this.isAnyKeyDown(keys.left)) {
			this.sprite.position.x -= this.speed * delta;
		} else if (this.isAnyKeyDown(keys.right)) {
			this.sprite.position.x += this.speed * delta;
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

}

export default Player;