import global from '../global/global';

class UI {

	private style : { font: string; fill: string; align : string; boundsAlignV: string; }

	constructor() {
		this.style = {
			font: 'bold 18px press-start-2p',
			fill: 'black',
			align: 'right',
			boundsAlignV: 'center',
		}
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

}

export default UI;