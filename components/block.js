export default class Block {
	constructor(ctx, img, x, y) {
		this.hitCounter = Math.floor(Math.random() * 2) + 1;

		this.width = 85;
		this.height = 30;

		this.ctx = ctx;
		this.img = img;
		this.color = 'red';

		this.x = x;
		this.y = y;
	}

	drawBlock() {
		// this.ctx.strokeStyle = this.color;
		// this.ctx.strokeRect(x, y, this.width, this.height);

		this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}