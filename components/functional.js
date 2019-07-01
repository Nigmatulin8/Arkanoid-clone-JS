import { options } from './particles.js';

const resourceCache = {};
const readyCallbacks = [];

export const fn = {
	resourceLoad: function(MAIN_ARR_OF_URL) {
		if(MAIN_ARR_OF_URL instanceof Array) {
        	MAIN_ARR_OF_URL.forEach(function(url) {
            	_load(url);
        	});
    	}
    	else {
        	_load(MAIN_ARR_OF_URL);
    	}
	},

	getImg: function(url) {
		return resourceCache[url];
	},

	isReady: function() {
		let ready = true;
		for(const data in resourceCache) {
			if(resourceCache.hasOwnProperty(data) && !resourceCache[data]) {
				ready = false;
			}
		}
		return ready;
	},

	onReady: function(func) {
		readyCallbacks.push(func);
	},

	communicatePoints: function(particle, parent, context) {
		for(let i = 0; i < parent.length; i++) {
			let distance = _particleDistanceCheck(particle.x, particle.y, parent[i].x, parent[i].y);
			let opacity = 1 - distance / options.communication;

			if(opacity > 0) {
				let gradient = context
						.createLinearGradient(particle.x, particle.y, parent[i].x, parent[i].y);

				gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
				gradient.addColorStop(.35, `rgba(0, 0, 255, ${opacity})`);
				gradient.addColorStop(.65, `rgba(0, 255, 0, ${opacity})`);
				gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`);
				context.strokeStyle = gradient;

				context.beginPath();
				context.moveTo(particle.x, particle.y);
				context.lineTo(parent[i].x, parent[i].y);
				context.closePath();
				context.stroke();
			}
		}
	},

	renderBackground: function(context, particles, width, height) {
		context.fillStyle = options.canvasColor;
		context.fillRect(0, 0, width, height);

		particles.forEach(particle => particle.updateCoords().render());
		particles.forEach(particle => fn.communicatePoints(particle, particles, context));
	}
}

function _load(url) {
	if(resourceCache[url]) {
		return resourceCache[url];
	}
	else {
		let img = new Image();
		img.onload = function() {
			resourceCache[url] = img;

			if(fn.isReady()) {
				readyCallbacks.forEach(function(func) { func(); });
			}
		};
		resourceCache[url] = false;
		img.src = url;
	}
}

function _particleDistanceCheck(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
}