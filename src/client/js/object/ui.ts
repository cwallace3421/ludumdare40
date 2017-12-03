import global from '../global/global';

class UI {

	private style : { font: string; fill: string; align : string; boundsAlignV: string; }
	private countdown : Phaser.Text;
	private timestamp : number;

	constructor() {
		this.style = {
			font: 'bold 18px press-start-2p',
			fill: 'black',
			align: 'right',
			boundsAlignV: 'center',
		}
		this.timestamp = Math.floor((+new Date()) / 1000);
		this.createCountdown();
	}

	public pingMessage(message : string) {
		const x = global.game.camera.width;
		const y = global.game.camera.height;
		const text = global.game.add.text(x, y, message, this.style, global.uiGrp);
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
		const y = 40;
		this.countdown = global.game.add.text(x, y, '00:00', this.style, global.uiGrp);
		this.countdown.anchor.set(0.5, 1);
	}

}

export default UI;