export default class Ball {
	constructor(ctx, img, settings) {
		this.ctx = ctx;
		this.img = img;

		this.x = settings.x;
		this.y = settings.y;

		this.width = settings.width;
		this.height = settings.height;

		this.speed = settings.speed;
		this.directionAngle = Math.floor(Math.random() * 180);

		this.direction = {
			x: Math.cos(this.directionAngle) * this.speed,
			y: Math.sin(this.directionAngle) * this.speed
		}
	}

	updateCoords(width, height) {
		//Line from 23 to 27 - checking borders and changing direction;
		if(this.x >= width - this.width || this.x <= 0)
			this.direction.x *= -1;

		if(this.y >= height - this.width || this.y <= 0)
			this.direction.y *= -1;

		//Конец игры
		// if(this.y + this.ballRadius >= height) {
		// 	console.error('GAME OVER');
		// 	return 'GAME OVER';
		// }
		this.x > width ? this.x = width : this.x;
		this.x < 0 ? this.x = 0 : this.x;

		this.y > height ? this.y = height : this.y;
		this.y < 0 ? this.y = 0 : this.y;

		this.x += this.direction.x; //Coordinate X update;
		this.y += this.direction.y; //Coordinate Y update;

		return this; //Necessary to call methods in a chain;
	}

	platformCollisionCheck(platform, ball) {
		//Попадание в левый угол. длина угла 20px
		if (platform.x < ball.x + ball.width && platform.x + 10 > ball.x &&
			platform.y < ball.y + ball.height &&
			platform.height + platform.y > ball.y && this.direction.x > 0) {
			this._changeDir();
		}

		//Попадание в правый угол
		else if (platform.x + platform.width - 10 < ball.x + ball.width &&
			platform.x + platform.width > ball.x && platform.y < ball.y + ball.height &&
		 	platform.height + platform.y > ball.y && this.direction.x < 0) {
			this._changeDir();
		}

		else if (platform.x < ball.x + ball.width && platform.x + platform.width > ball.x &&
		 	platform.y < ball.y + ball.height && platform.height + platform.y > ball.y) {
			this.direction.y *= -1
		}
	}

	checkBlockCollision(block, ball) {
		if(block.x < ball.x + ball.width && block.x + block.width > ball.x &&
		 	block.y < ball.y + ball.height && block.height + block.y > ball.y) {
				this.direction.y *= -1;

			return true;
		}
	}

	drawBall() {
		// this.ctx.strokeStyle = 'red';
		// this.ctx.strokeRect(this.x, this.y, this.width, this.height);

		this.ctx.drawImage(this.img, this.x, this.y,
			this.width, this.height);
	}

	_changeDir() {
		this.direction.x *= -1;
		this.direction.y *= -1;
	}

	_randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1)
    	rand = Math.round(rand);
    	return rand;
	}
}