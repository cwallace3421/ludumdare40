import Crate from './object/crate';
import Pickup from './object/pickup';
import Player from './object/player';
import Searchable from './object/searchable';
import UI from './object/ui';
import global from './global/global';
import types from './global/types';
import utils from './global/utils';

class Playing {

	private delta : number;
	private world : Phaser.Sprite;
	private player : Player;
	private pickups : Pickup[];
	private searchables : Searchable[];
	private tint : Phaser.Sprite;
	private gunner : Phaser.Sprite;
	private redblue : Phaser.Sprite[];
	private glasses : number;
	private env : { [key:string] : Phaser.Sprite; };

	init() {
		global.game.stage.disableVisibilityChange = true;
		global.game.renderer.clearBeforeRender = false;
		global.game.renderer.renderSession.roundPixels = true;
		global.game.stage.backgroundColor = '#9e9e9e';
		global.game.physics.startSystem(Phaser.Physics.ARCADE);
		global.game.world.setBounds(0, 0, utils.scale(global.roomW), utils.scale(global.roomH));
	}

	createBackground() {
		this.env = {};
		// Top Wall
		this.env.wall = global.game.add.sprite(0, 0, 'wall', 0, global.sprGrp);
		this.env.wall.width = global.roomW;
		global.game.physics.arcade.enable(this.env.wall);
		this.env.wall.body.immovable = true;
		this.env.wall.body.setSize(utils.scale(this.env.wall.width), utils.scale(this.env.wall.height), 0, 0);
		this.env.wall.body.moves = false;
		// Exit Door
		this.env.door = global.game.add.sprite(500, global.wallH + 2, 'exit_door', 0, global.sprGrp);
		this.env.door.anchor.setTo(0.1, 1);
		global.game.physics.arcade.enable(this.env.door);
		this.env.door.body.setSize(
			utils.scale(this.env.door.width),
			utils.scale(this.env.door.width / 2),
			utils.scale(0) - (this.env.door.anchor.x * this.env.door.width),
			utils.scale(this.env.door.height) - (this.env.door.anchor.y * this.env.door.height) - 20,
		);
		this.env.door.body.immovable = true;
		this.env.door.body.moves = false;
	}

	create() {
		global.decGrp = global.game.add.group(undefined, 'decor_group');
		global.decGrp.scale.setTo(global.scale);
		global.sprGrp = global.game.add.group(undefined, 'sprite_group');
		global.sprGrp.scale.setTo(global.scale);
		global.uiGrp = global.game.add.group(undefined, 'ui_group');
		global.uiGrp.fixedToCamera = true;

		this.tint = global.game.add.sprite(0, 0, 'tint', 0, global.uiGrp);
		this.tint.width = global.game.camera.width;
		this.tint.height = global.game.camera.height;
		this.tint.tint = 0x000000;
		this.tint.alpha = 0.0;

		this.gunner = global.game.add.sprite(0, 0, 'tint', 0, global.uiGrp);
		this.gunner.width = global.game.camera.width;
		this.gunner.height = global.game.camera.height;
		this.gunner.tint = 0xf0d434;
		this.gunner.alpha = 0.0;

		this.redblue = [];
		// Red - Left
		this.redblue.push(global.game.add.sprite(0, 0, 'tint', 0, global.uiGrp));
		this.redblue[0].width = global.game.camera.width / 2;
		this.redblue[0].height = global.game.camera.height;
		this.redblue[0].tint = 0xce0000;
		this.redblue[0].alpha = 0.0;
		// Blue - Right
		this.redblue.push(global.game.add.sprite(global.game.camera.width / 2, 0, 'tint', 0, global.uiGrp));
		this.redblue[1].width = global.game.camera.width / 2;
		this.redblue[1].height = global.game.camera.height;
		this.redblue[1].tint = 0x0028ce;
		this.redblue[1].alpha = 0.0;

		global.ui = new UI();
		this.createBackground();
		this.player = new Player(this.env.door.centerX, this.env.door.y + 20);
		this.generateMap();
		global.game.camera.follow(this.player.getSprite(), Phaser.Camera.FOLLOW_TOPDOWN);
	}

	update() {
		this.setDelta();
		global.ui.update();
		this.player.update(this.delta);
		this.player.collide(this.searchables, this.env.wall);
		const pickedUp = this.player.interact(this.pickups, this.searchables);

		for (let i = 0; i < pickedUp.length; i++) {
			const type = pickedUp[i];
			switch(type) {
				case 1 : {
					global.ui.pingMessage('+1 ' + types[type]);
					this.tint.alpha += 0.02;
					break;
				}
				case 2 : {
					global.ui.pingMessage('+1 ' + types[type]);
					this.gunner.alpha += 0.05;
					break;
				}
				case 3 : {
					global.ui.pingMessage('+1 ' + types[type]);
					this.redblue[0].alpha += 0.05;
					this.redblue[1].alpha += 0.05;
					break;
				}
			}
			global.glasses++;
		}

		this.pickups = this.pickups.filter((value : Pickup, index : number, array : Pickup[]) => {
			return value.isAlive();
		});

		if (global.ui.isCountdownDone() || (global.glasses > 0 && this.player.isOverlap(this.env.door))) {
			global.game.world.removeAll();
			global.game.state.start('end', false, false, global.ui.isCountdownDone(), global.ui.getTimeLeft());
		}

		global.sprGrp.sort('y', Phaser.Group.SORT_ASCENDING);
	}

	generateMap() {
		this.pickups = [];
		this.searchables = [];

		const tileSize = 80;
		const numTileX = Math.floor(global.roomW / 80);
		const numTileY = Math.floor((global.roomH - global.wallH) / 80);

		for (let y = 0; y < numTileY; y++) {
			for (let x = 0; x < numTileX; x++) {
				const chance = Math.random();
				if (chance <= 0.1) {
					const posX = (x * 80) + utils.randomIntFromInterval(30, 50);
					const posY = (y * 80) + utils.randomIntFromInterval(30, 50) + global.wallH + 30;
					this.pickups.push(new Pickup(posX, posY));
				} else if (chance <= 0.4) {
					const posX = (x * 80) + utils.randomIntFromInterval(30, 50);
					const posY = (y * 80) + utils.randomIntFromInterval(30, 50) + global.wallH + 30;
					this.searchables.push(new Crate(posX, posY, Math.random() <= 0.3));
				} else if (chance >= 0.93) {
					const posX = (x * 80) + utils.randomIntFromInterval(30, 50);
					const posY = (y * 80) + utils.randomIntFromInterval(30, 50) + global.wallH + 30;
					global.game.add.sprite(posX, posY, 'decoration', utils.randomIntFromInterval(0, 7), global.decGrp).anchor.setTo(0.5);
				}
			}
		}
	}

	render() {
		const debug = false;
		if (debug) {
			global.game.debug.body(this.player.getSprite());
			for (let i = 0; i < this.searchables.length; i++) {
				global.game.debug.body(this.searchables[i].getSprite());
				global.game.debug.body(this.searchables[i].getTrigger());
			}
			for (let i = 0; i < this.pickups.length; i++) {
				global.game.debug.body(this.pickups[i].getSprite());
			}
			global.game.debug.body(this.env.wall);
			global.game.debug.body(this.env.door);
		}
	}

	resize() {
		global.game.scale.setGameSize(window.innerWidth, window.innerHeight);
		global.ui.updateCountdownPos();
		this.tint.width = global.game.camera.width;
		this.tint.height = global.game.camera.height;
		this.gunner.width = global.game.camera.width;
		this.gunner.height = global.game.camera.height;
		this.redblue[0].width = global.game.camera.width / 2;
		this.redblue[0].height = global.game.camera.height;
		this.redblue[1].width = global.game.camera.width / 2;
		this.redblue[1].height = global.game.camera.height;
		this.redblue[1].x = global.game.camera.width / 2;
	}

	setDelta() {
		this.delta = (global.game.time.elapsedMS * global.game.time.fps) / 1000;
	}

}

export default Playing;