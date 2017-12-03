import Crate from './object/crate';
import Pickup from './object/pickup';
import Player from './object/player';
import Searchable from './object/searchable';
import UI from './object/ui';
import global from './global/global';
import utils from './global/utils';

class Playing {

	private delta : number;
	private world : Phaser.Sprite;
	private player : Player;
	private pickups : Pickup[];
	private searchables : Searchable[];
	private tint : Phaser.Sprite;
	private env : { [key:string] : Phaser.Sprite; };

	init() {
		global.game.time.advancedTiming = true;
		global.game.stage.disableVisibilityChange = true;
		global.game.renderer.clearBeforeRender = false;
		global.game.renderer.renderSession.roundPixels = true;
		global.game.physics.startSystem(Phaser.Physics.ARCADE);
		global.game.world.setBounds(0, 0, global.roomW, global.roomH);
	}

	createBackground() {
		this.env = {};
		// Top Wall
		this.env.wall = global.game.add.sprite(0, 0, 'wall', 0, global.sprGrp);
		this.env.wall.width = global.roomW;
		global.game.physics.arcade.enable(this.env.wall);
		this.env.wall.body.immovable = true;
		this.env.wall.body.setSize(utils.scale(this.env.wall.width), utils.scale(this.env.wall.height), 0, 0);
		// Exit Door
		this.env.door = global.game.add.sprite(500, global.wallH + 2, 'exit_door', 0, global.sprGrp);
		this.env.door.anchor.setTo(0.1, 1);
		global.game.physics.arcade.enable(this.env.door);
		this.env.door.body.setSize(
			utils.scale(this.env.door.width),
			utils.scale(this.env.door.width / 2),
			utils.scale(0) - (this.env.door.anchor.x * (this.env.door.width / 2)),
			-(this.env.door.anchor.y * (this.env.door.height / 2)) + utils.scale(this.env.door.height) - 10,
		);
	}

	create() {
		global.sprGrp = global.game.add.group(undefined, 'sprite_group');
		global.sprGrp.scale.setTo(1.5);
		global.uiGrp = global.game.add.group(undefined, 'ui_group');
		global.uiGrp.fixedToCamera = true;
		global.ui = new UI();

		this.tint = global.game.add.sprite(0, 0, 'tint', 0, global.uiGrp);
		this.tint.width = global.game.camera.width;
		this.tint.height = global.game.camera.height;
		this.tint.alpha = 0.0;

		this.createBackground();
		this.player = new Player(this.env.door.centerX, this.env.door.y + 20);
		this.pickups = [
			new Pickup(600, 600),
		];
		this.searchables = [
			new Crate(200, 600, false),
			new Crate(400, 500, false),
			new Crate(100, 300, true),
		];
		global.game.camera.follow(this.player.getSprite(), Phaser.Camera.FOLLOW_TOPDOWN);
	}

	update() {
		this.setDelta();
		global.ui.update();
		this.player.update(this.delta);
		this.player.collide(this.searchables, this.env.wall);
		this.player.interact(this.pickups, this.searchables);

		this.pickups = this.pickups.filter((value : Pickup, index : number, array : Pickup[]) => {
			if (!value.isAlive()) {
				this.tint.alpha += 0.1;
				global.ui.pingMessage('+1 Sunglasses');
			}
			return value.isAlive();
		})

		global.sprGrp.sort('y', Phaser.Group.SORT_ASCENDING);
	}

	render() {
		// global.game.debug.body(this.player.getSprite());
		// for (let i = 0; i < this.searchables.length; i++) {
		// 	global.game.debug.body(this.searchables[i].getSprite());
		// 	global.game.debug.body(this.searchables[i].getTrigger());
		// }
		// for (let i = 0; i < this.pickups.length; i++) {
		// 	global.game.debug.body(this.pickups[i].getSprite());
		// }
		// global.game.debug.body(this.env.wall);
		// global.game.debug.body(this.env.door);
	}

	preload() {
		global.game.load.spritesheet('character', 'assets/character.png', 32, 64, 16 * 8);
		global.game.load.spritesheet('pickup', 'assets/pickup.png', 32, 32, 8 * 8);
		global.game.load.image('pickup_highlight', 'assets/pickup_highlight.png');
		global.game.load.image('crate_small', 'assets/crate_small.png');
		global.game.load.image('crate_tall', 'assets/crate_tall.png');
		global.game.load.image('world', 'assets/temp_world.png');

		global.game.load.image('wall', 'assets/wall_tiled.png');
		global.game.load.image('exit_door', 'assets/exit_door.png');

		global.game.load.image('tint', 'assets/tint.png');
	}

	resize() {
		global.game.scale.setGameSize(window.innerWidth, window.innerHeight);
	}

	setDelta() {
		this.delta = (global.game.time.elapsedMS * global.game.time.fps) / 1000;
	}

}

export default Playing;