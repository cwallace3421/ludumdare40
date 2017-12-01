import Global from './global';

class Playing {

	init() {
		console.log('Hello World');
	}

	create() {

	}

	update() {

	}

	updateCountdown() {

	}

	completeCountdown() {

	}

	preload() {

	}

	resize() {
		Global.game.scale.setGameSize(window.innerWidth, window.innerHeight);
	}

}

export default Playing;