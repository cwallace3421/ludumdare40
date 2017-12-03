import global from './global';

class Utils {

	public static randomIntFromInterval(min, max) : number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	public static scale(value) : number {
		return value * global.scale;
	}

}

export default Utils;