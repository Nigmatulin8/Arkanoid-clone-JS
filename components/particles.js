export const options = {
	particleColor: '#fcfcfc',
	canvasColor: '#222',

	particleAmount: 25,

	defaultSpeed: 1,
	addedSpeed: 2,

	defaultRadius: 2,
	addedRadius: 2,

	communication: 200
};

export class Particles {
	constructor(width, height, ctx) {
		this.context = ctx;
		this.width = width;
		this.height = height;

		this.x = Math.floor(Math.random() * this.width);
		this.y = Math.floor(Math.random() * this.height);

		this.directionAngle = Math.floor(Math.random() * 360);
		this.speed = options.defaultSpeed + Math.random() * options.addedSpeed;
		this.radius = options.defaultRadius + Math.random() * options.addedRadius;

		this.direction = {
			x: Math.cos(this.directionAngle) * this.speed,
			y: Math.sin(this.directionAngle) * this.speed
		}
	}

	updateCoords() {
		//Line from 42 to 46 - checking borders and changing direction;
		if(this.x >= this.width || this.x <= 0)
			this.direction.x *= -1;

		if(this.y >= this.height || this.y <= 0)
			this.direction.y *= -1;

		//Line from 50 to 54 - coord X and coord Y element position adjustment
		//(the element does not fly off the screen);
		this.x > this.width ? this.x = this.width : this.x;
		this.x < 0 ? this.x = 0 : this.x;

		this.y > this.height ? this.y = this.height : this.y;
		this.y < 0 ? this.y = 0 : this.y;

		this.x += this.direction.x; //Coordinate X update;
		this.y += this.direction.y; //Coordinate Y update;

		return this; //Necessary to call methods in a chain;
	}

	render() {
		this.context.fillStyle = options.particleColor;
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.context.closePath();
		this.context.fill();
	}
}