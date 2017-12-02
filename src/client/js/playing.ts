import Crate from './object/crate';
import Pickup from './object/pickup';
import Player from './object/player';
import Searchable from './object/searchable';
import global from './global/global';

class Playing {

	private delta : number;
	private world : Phaser.Sprite;
	private player : Player;
	private pickups : Pickup[];
	private searchables : Searchable[];

	init() {
		global.game.time.advancedTiming = true;
		global.game.stage.disableVisibilityChange = true;
		global.game.renderer.clearBeforeRender = false;
		global.game.renderer.renderSession.roundPixels = true;
	}

	create() {
		this.world = global.game.add.sprite(0, 0, 'world');
		this.player = new Player(500, 500);
		this.pickups = [
			new Pickup(50, 50),
			new Pickup(600, 600),
		];
		this.searchables = [
			new Crate(200, 600, false),
			new Crate(400, 500, false),
			new Crate(100, 300, true),
		];
	}

	update() {
		this.setDelta();
		this.player.update(this.delta);
		this.player.collide(this.searchables);
		this.player.interact(this.pickups);

		global.game.world.sort('y', Phaser.Group.SORT_ASCENDING);
	}

	render() {
		// global.game.debug.body(this.player.getSprite());
		// for (let i = 0; i < this.searchables.length; i++) {
		// 	global.game.debug.body(this.searchables[i].getSprite());
		// }
	}

	preload() {
		global.game.load.spritesheet('character', 'assets/character.png', 32, 64, 16 * 8);
		global.game.load.spritesheet('pickup', 'assets/pickup.png', 32, 32, 8 * 8);
		global.game.load.image('pickup_highlight', 'assets/pickup_highlight.png');
		global.game.load.image('crate_small', 'assets/crate_small.png');
		global.game.load.image('crate_tall', 'assets/crate_tall.png');
		global.game.load.image('world', 'assets/temp_world.png');
	}

	resize() {
		global.game.scale.setGameSize(window.innerWidth, window.innerHeight);
	}

	setDelta() {
		this.delta = (global.game.time.elapsedMS * global.game.time.fps) / 1000;
	}

}

export default Playing;