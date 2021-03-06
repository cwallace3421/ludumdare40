import Pickup from './pickup';
import Searchable from './searchable';
import global from '../global/global';
import keys from '../global/keys';
import types from '../global/types';
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
	}

	private createCollision() {
		global.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.setSize(
			utils.scale(this.sprite.width),
			utils.scale(6),
			utils.scale(0) - (this.sprite.anchor.x * (this.sprite.width)),
			utils.scale(this.sprite.height) - utils.scale(6) - (this.sprite.anchor.y * (this.sprite.height)),
		);
		this.sprite.body.bounce.set(0,0);
	}

	public update(delta : number) {
		this.movement(delta);

		if (global.glasses > 0) {
			this.sprite.frame = 1;
		}
	}

	public collide(searchables : Searchable[], ...args : Phaser.Sprite[]) {
		for (let i = 0; i < searchables.length; i++) {
			if (!searchables[i].isSolid()) {
				continue;
			}

			global.game.physics.arcade.collide(this.sprite, searchables[i].getSprite());
		}

		if (args) {
			for (let i = 0; i < args.length; i++) {
				if (!args[i].visible || !args[i].alive) {
					continue;
				}
				global.game.physics.arcade.collide(this.sprite, args[i]);
			}
		}
	}

	public isOverlap(obj : Phaser.Sprite) {
		return global.game.physics.arcade.overlap(this.sprite, obj);
	}

	private movement(delta : number) {
		let dirY = 0;
		dirY -= this.isAnyKeyDown(keys.up) ? 1 : 0;
		dirY += this.isAnyKeyDown(keys.down) ? 1 : 0;

		let dirX = 0;
		dirX -= this.isAnyKeyDown(keys.left) ? 1 : 0;
		dirX += this.isAnyKeyDown(keys.right) ? 1 : 0;

		const vector = new Phaser.Point(dirX, dirY);
		vector.normalize();

		this.sprite.body.velocity.set(vector.x * this.speed, vector.y * this.speed);
	}

	public interact(pickups : Pickup[], searchables : Searchable[]) : number[] {
		const result = [];
		for (let i = 0; i < pickups.length; i++) {
			if (pickups[i].isAlive()) {
				if (global.game.physics.arcade.overlap(this.sprite, pickups[i].getSprite())) {
					pickups[i].toggleHighlight(true);
					if (this.isAnyKeyDown(keys.pickup)) {
						result.push(pickups[i].getType());
						pickups[i].kill();
					}
				} else {
					pickups[i].toggleHighlight(false);
				}
			}
		}


		for (let i = 0; i < searchables.length; i++) {
			if (global.game.physics.arcade.overlap(this.sprite, searchables[i].getTrigger())) {
				if (!searchables[i].hasBeenLooted()) {
					searchables[i].toggleHighlight(true);
					if (this.isAnyKeyDown(keys.search)) {
						const lootedType = searchables[i].loot();
						if (lootedType === 0) {
							global.ui.pingMessage('Crate is empty');
						} else {
							result.push(lootedType);
						}
					}
				} else {
					searchables[i].toggleHighlight(false);
				}
			} else {
				searchables[i].toggleHighlight(false);
			}
		}

		return result;
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
