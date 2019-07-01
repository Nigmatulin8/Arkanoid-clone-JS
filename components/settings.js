export default class Settings {
	constructor() {
		this.canvasWidth = 780;
		this.canvasHeight = 720;

		this.platformSettings = {
			speed: 25,
			addedSpeed: 50,
			maxSpeed: 2000,

			width: 130, //130
			height: 20,

			x: 325,
			y: 690
		};

		this.ballSettings = {
			x: 370,
			y: 640,

			width: 40,
			height: 40,

			speed: 7,
			addedSpeed: 1
		};

		//Blocks
		this.blocksAmount = 20;

		//Score
		this.score = 0;
	}
}