import global from './global/global';

class End {

	private glasses : Phaser.Sprite;
	private endText : Phaser.Text;
	private anykeyText : Phaser.Text;
	private didTimeRunOut : boolean;
	private leftOnCountdown : number;

	init(didTimeRunOut : boolean, leftOnCountdown : number) {
		global.game.stage.disableVisibilityChange = true;
		global.game.renderer.clearBeforeRender = false;
		global.game.renderer.renderSession.roundPixels = true;
		global.game.stage.backgroundColor = '#0784df';

		this.didTimeRunOut = didTimeRunOut;
		this.leftOnCountdown = leftOnCountdown;
	}

	create() {
		global.game.input.keyboard.onDownCallback = (event) => {
			if (event.keyCode === Phaser.Keyboard.ENTER) {
				global.game.input.keyboard.onDownCallback = null;
				global.game.state.start('enter', true, true);
			}
		};

		let message = '';
		if (this.didTimeRunOut) {
			message = 'You were caught in the act!\nYou will be taken to a dark room and expriemented on...\n\nYou could have delivered ' + global.glasses + ' glasses to the cause!\n\n\n\n' +
			'Thank you for playing :)\n\nCreated by Conor Wallace';
		} else {
			message = 'Congratulations! You have collected ' + global.glasses + ' glasses for the cause.\n\n' +
			'There were ' + this.leftOnCountdown + ' second(s) left on the countdown.\n\n\n\n' +
			'Thank you for playing :)\n\nCreated by Conor Wallace';
		}

		// Lore
		this.endText = global.game.add.text(
			global.game.camera.width / 2,
			global.game.camera.height / 2,
			message,
			{
				font: 'bold 22px press-start-2p',
				fill: 'black',
				align: 'center',
			}
		);
		this.endText.wordWrap = true;
		this.endText.wordWrapWidth = global.game.camera.width - 100;
		this.endText.anchor.setTo(0.5);

		// Instruction
		this.anykeyText = global.game.add.text(
			global.game.camera.width / 2,
			global.game.camera.height - 60,
			'Press ENTER to restart...',
			{
				font: 'bold 18px press-start-2p',
				fill: 'black',
				align: 'center',
			}
		);
		this.anykeyText.visible = true;
		this.anykeyText.anchor.setTo(0.5);
	}

	update() {

	}

	preload() {

	}

	resize() {
		global.game.scale.setGameSize(window.innerWidth, window.innerHeight);
		this.anykeyText.x = global.game.camera.width / 2;
		this.anykeyText.y = global.game.camera.height - 100;
		this.endText.x = global.game.camera.width / 2;
		this.endText.y = global.game.camera.height / 2;
		this.endText.wordWrapWidth = global.game.camera.width - 100;
	}

}

export default End;