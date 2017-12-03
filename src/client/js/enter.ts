import Crate from './object/crate';
import Pickup from './object/pickup';
import Player from './object/player';
import Searchable from './object/searchable';
import UI from './object/ui';
import global from './global/global';
import types from './global/types';
import utils from './global/utils';

class Enter {

	private glasses : Phaser.Sprite;
	private titleText : Phaser.Text;
	private introText : Phaser.Text;
	private anykeyText : Phaser.Text;

	private state : number;

	init() {
		global.game.stage.disableVisibilityChange = true;
		global.game.renderer.clearBeforeRender = false;
		global.game.renderer.renderSession.roundPixels = true;
		global.game.stage.backgroundColor = '#0784df'; //'#7e7e7e';
		this.state = 2;
	}

	createBackground() {
		// Spinning Glasses
	}

	create() {
		global.game.input.keyboard.onDownCallback = (event) => {
			if (event.keyCode === Phaser.Keyboard.ENTER) {
				this.state--;
				if (this.state <= 0) {
					global.game.input.keyboard.onDownCallback = null;
					global.game.state.start('playing');
				} else if (this.state === 1) {
					this.introText.visible = true;
					this.titleText.visible = false;
					this.anykeyText.text = 'Press ENTER to start...';
				}
			}
		};

		// Title
		this.titleText = global.game.add.text(
			global.game.camera.width / 2,
			global.game.camera.height / 2,
			'Aliens Stole My Glasses',
			{
				font: 'bold 38px press-start-2p',
				fill: 'white',
				align: 'center',
				stroke: 'black',
				strokeThickness: 6,
			}
		);
		this.titleText.visible = true;
		this.titleText.anchor.setTo(0.5);

		// Instruction
		this.anykeyText = global.game.add.text(
			global.game.camera.width / 2,
			global.game.camera.height - 60,
			'Press ENTER to continue...',
			{
				font: 'bold 18px press-start-2p',
				fill: 'black',
				align: 'center',
			}
		);
		this.anykeyText.visible = true;
		this.anykeyText.anchor.setTo(0.5);

		// Lore
		this.introText = global.game.add.text(
			global.game.camera.width / 2,
			global.game.camera.height / 2,
			'Strange aliens have landed on Earth.\n' +
			'We don\'t know why they\'re here.\n' +
			'To human eyes they look like red monoliths for some reason....\n\n' +

			'You are one of the aliens. You have entered a warehouse \nand set off the slient ALARM.\n' +
			'You have 3 minutes to steal as many glasses as you can.\n' +
			'Get back to the exit before time runs out! Or you\'ll be caught.\n\n' +
			'Since you have no arms you have to carry them on your face.\nWhich may cause problems...\n\n' +
			'WASD to Move\n' + 'E or SPACEBAR to Pickup\n' + 'E or SPACEBAR to Search Crates\n',
			{
				font: 'bold 22px press-start-2p',
				fill: 'black',
				align: 'center',
			}
		);
		this.introText.wordWrap = true;
		this.introText.wordWrapWidth = global.game.camera.width - 100;
		this.introText.visible = false;
		this.introText.anchor.setTo(0.5);

	}

	update() {

	}

	preload() {
		global.game.load.spritesheet('character', 'assets/character.png', 32, 64, 16 * 8);

		global.game.load.spritesheet('pickup', 'assets/pickup.png', 32, 32, 8 * 8);
		global.game.load.image('pickup_highlight', 'assets/pickup_highlight.png');

		global.game.load.image('crate_small', 'assets/crate_small.png');
		global.game.load.image('crate_tall', 'assets/crate_tall.png');
		global.game.load.image('crate_shadow', 'assets/crate_shadow.png');

		global.game.load.image('wall', 'assets/wall_tiled.png');
		global.game.load.image('exit_door', 'assets/exit_door.png');

		global.game.load.spritesheet('decoration', 'assets/decoration.png', 42, 42, 8);

		global.game.load.image('tint', 'assets/tint.png');
	}

	resize() {
		global.game.scale.setGameSize(window.innerWidth, window.innerHeight);
		this.titleText.x = global.game.camera.width / 2;
		this.titleText.y = global.game.camera.height / 2;
		this.anykeyText.x = global.game.camera.width / 2;
		this.anykeyText.y = global.game.camera.height - 100;
		this.introText.x = global.game.camera.width / 2;
		this.introText.y = global.game.camera.height / 2;
		this.introText.wordWrapWidth = global.game.camera.width - 100;
	}

}

export default Enter;