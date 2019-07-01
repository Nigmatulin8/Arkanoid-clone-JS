import { fn } from './components/functional.js';
import Platform from './components/platform.js';
import Ball from './components/ball.js';
import Blocks from './components/block.js';
import Settings from './components/settings.js';
import {options, Particles} from './components/particles.js';
/*************************************************/
import Playfield from './components/playfield.js';
/*************************************************/
const requestAnimationFrame = window.requestAnimationFrame ||
							  window.mozReuestAnimationFrame ||
							  window.webkitRequestAnimationFrame ||
							  window.msRequestAnimationFrame ||
							  function(callback, element) {
							  	  window.setTimeout(callback, 1000 / 60);
							  };
window.requestAnimationFrame = requestAnimationFrame;

//Background canvas
const bg_canvas = document.getElementById('background');
const bg_ctx = bg_canvas.getContext('2d')

const bg_width = bg_canvas.width = window.innerWidth;
const bg_height = bg_canvas.height = window.innerHeight;

const particles = [];
setup();

function setup() {
	for(let i = 0; i < options.particleAmount; i++)
		particles.push(new Particles(bg_width, bg_height, bg_ctx));
}
/**********************************************************/

//Game canvas
const canvas = document.getElementById('game__canvas');
const ctx = canvas.getContext('2d');

const settings = new Settings();

const width = canvas.width = settings.canvasWidth;
const height = canvas.height = settings.canvasHeight;

const textures = {
	ball: ['sprites/ball/ball1.png'],
	platform: ['sprites/platforms/ground_stone_main_platform.png'],
	background: ['sprites/background.png'],
	blocks: [
		'sprites/platforms/ground_cake.png',
		'sprites/platforms/ground_grass.png',
		'sprites/platforms/ground_sand.png',
		'sprites/platforms/ground_snow.png',
		'sprites/platforms/ground_wood.png'
	],
	brokenBlocks: [
		'sprites/platforms/ground_cake_broken.png',
		'sprites/platforms/ground_grass_broken.png',
		'sprites/platforms/ground_sand_broken.png',
		'sprites/platforms/ground_snow_broken.png',
		'sprites/platforms/ground_wood_broken.png'
	]
}

fn.resourceLoad([
	'sprites/ball/ball1.png',
	'sprites/background.png',
	'sprites/platforms/ground_stone_main_platform.png',
	'sprites/platforms/ground_cake.png',
	'sprites/platforms/ground_grass.png',
	'sprites/platforms/ground_sand.png',
	'sprites/platforms/ground_snow.png',
	'sprites/platforms/ground_wood.png',
	'sprites/platforms/ground_cake_broken.png',
	'sprites/platforms/ground_grass_broken.png',
	'sprites/platforms/ground_sand_broken.png',
	'sprites/platforms/ground_snow_broken.png',
	'sprites/platforms/ground_wood_broken.png'
]);

let enemiesMap = [
	[1, 0, 1, 0, 2, 3, 0, 1],
	[1, 2, 1, 0, 1, 3, 1, 3],
	[0, 1, 0, 2, 1, 1, 0, 1],
	[2, 0, 2, 1, 0, 2, 1, 2],
	[1, 2, 1, 1, 2, 1, 3, 1],
	[3, 2, 0, 0, 1, 1, 1, 0],
	[0, 1, 2, 0, 1, 2, 1, 3]
];

let enemies = [];
let block_x = 15;
let block_y = 15;

fn.onReady(init);

function init() {
	const platform = new Platform(ctx, fn.getImg(textures.platform[0]), settings.platformSettings);
	const ball = new Ball(ctx, fn.getImg(textures.ball[0]), settings.ballSettings);

	//Инициализация блоков для ломания
	for(let i = 0; i < enemiesMap.length; i++) {
		enemies[i] = [];

		for(let j = 0; j < enemiesMap[i].length; j++) {
			switch (enemiesMap[i][j]) {
				case 3 :
					enemies[i].push(new Blocks(ctx, fn.getImg(textures.blocks[2]), block_x, block_y));
					break;
				case 2 :
					enemies[i].push(new Blocks(ctx, fn.getImg(textures.blocks[1]), block_x, block_y));
					break;
				case 1 :
					enemies[i].push(new Blocks(ctx, fn.getImg(textures.blocks[0]), block_x, block_y));
					break;
				case 0 :
					enemies[i].push(0);
			}

			block_x += 95;
		}

		block_y += 50;
		block_x = 15;
	}

	requestAnimationFrame(main);

	function main() {
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, width, height);

		ctx.drawImage(fn.getImg(textures.background[0]), 0, 0, width, height);

		ball.updateCoords(width, height);
		ball.platformCollisionCheck(platform, ball);
		platform.drawPlatform();
		ball.drawBall();

		enemies.forEach(row => {
			row.forEach(enemy => {
				if(enemy) {
					enemy.drawBlock(block_x, block_y);
				}
			});
		});

		enemies.forEach((row, i) => {
			row.forEach((enemy, j) => {
				if(ball.checkBlockCollision(enemy, ball)) {
					enemies[i][j] = 0;
				}
			});
		});


		/****** BACKGROUND ******/
		fn.renderBackground(bg_ctx, particles, bg_width, bg_height);
		/***********************/

		requestAnimationFrame(main);
	}

	addEventListener('keydown', e => {
		platform.updatePlatformCoords(e.key).drawPlatform();
	});
}

/*
Умножая параметры обновления с параметром dt,
мы считаем сумму пикселей для перемещение по фрейму.
Если прошла одна секунда с последнего обновления то игрок продвинется на 200 пикселей,
если 0,5 то на 100.
Это показывается как постоянная скорость передвижения зависит от частоты кадров.
*/

		//Временное решение конца игры.
		// if(ball.updateCoords(width, height) == 'GAME OVER') {
		// 	console.log('end game');
		// 	return;
		// }
