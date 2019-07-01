export default class Platform {
	constructor(context, img, settings) {
		this.dx = 0;

		this.ctx = context;
		this.img = img;

		this.width = settings.width;
		this.height = settings.height;

		this.x = settings.x;
		this.y = settings.y;

		this.speed = settings.speed;
	}

	updatePlatformCoords(dir) {
		if(dir === 'ArrowRight') {
			this.dx = this.speed;
		}

		if(dir === 'ArrowLeft') {
			this.dx = -this.speed;
		}

		this.x += this.dx;

//Доводит платформу к краю, если остается 2 пикселя. 0 - к левому краю, 648 - к правому
		this.x < 2 ? this.x = 0 : this.x;
		this.x > 648 ? this.x = 650 : this.x;

		return this;
	}

	drawPlatform() {
		// this.ctx.strokeStyle = 'red';
		// this.ctx.strokeRect(this.x, this.y, this.width, this.height);

		this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}