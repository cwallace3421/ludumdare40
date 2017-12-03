import global from '../global/global';

class UI {

	private countdown : Phaser.Text;
	private timestamp : number;

	constructor() {
		this.timestamp = Math.floor((+new Date()) / 1000);
		this.createCountdown();
	}

	public pingMessage(message : string) {
		const x = global.game.camera.width - 10;
		const y = global.game.camera.height;

		const text = global.game.add.text(x, y, message, {
			font: 'bold 18px press-start-2p',
			fill: 'black',
			align: 'right',
			boundsAlignV: 'center',
		}, global.uiGrp);

		text.anchor.set(1, 0);
		text.alpha = 1;
		global.game.add.tween(text).to({ alpha: 0, y: y / 2 }, 3000, 'Linear', true).onComplete.add(() => {
			text.destroy();
		});
	}

	public update() {
		const timeLeft = Math.max((this.timestamp + global.countdownAmount) - Math.floor((+new Date()) / 1000), 0);
		const minutes = Math.floor(timeLeft / 60);
		const seconds = Math.floor(timeLeft % 60);
		this.countdown.text = (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
	}

	private createCountdown() {
		const x = global.game.camera.width / 2;
		const y = 50;

		this.countdown = global.game.add.text(x, y, '00:00', {
			font: 'bold 24px press-start-2p',
			fill: 'white',
			align: 'center',
			stroke: 'black',
			strokeThickness: 6,
		}, global.uiGrp);

		this.countdown.anchor.set(0.5, 1);
	}

	public isCountdownDone() {
		return Math.max((this.timestamp + global.countdownAmount) - Math.floor((+new Date()) / 1000), 0) === 0;
	}

	public updateCountdownPos() {
		this.countdown.position.x = global.game.camera.width / 2;
	}

}

export default UI;