import Player from './object/player';
import global from './global/global';

class Playing {

	private delta : number;
	private world : Phaser.Sprite;
	private player : Player;

	init() {
		global.game.time.advancedTiming = true;
		global.game.stage.disableVisibilityChange = true;
		global.game.renderer.clearBeforeRender = false;
		global.game.renderer.renderSession.roundPixels = true;
	}

	create() {
		this.world = global.game.add.sprite(0, 0, 'world');
		this.player = new Player(500, 500);
	}

	update() {
		this.setDelta();
		this.player.update(this.delta);
	}

	render() {
		global.game.debug.body(this.player.getSprite());
	}

	preload() {
		global.game.load.spritesheet('character', 'assets/character.png', 32, 64, 16 * 8);
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