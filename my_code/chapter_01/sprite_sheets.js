var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var readout = document.getElementById('readout');
var spritesheet = new Image();

function windowToCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x: x - bbox.left * (canvas.width / bbox.width),
		y: y - bbox.top * (canvas.height / bbox.height)
	};
}

function drawBackground() {
	const VERTICAL_LINE_SPACING = 12;
	var i = context.canvas.height;

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.strokeStype = 'lightgray';
	context.lineWidth = 0.5;

	while (i > VERTICAL_LINE_SPACING * 5) {
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(context.canvas.width, i);
		context.stroke();

		i -= VERTICAL_LINE_SPACING;
	}
}

function drawingSpritesheet() {
	context.drawImage(spritesheet, 0, 0);
}

function drawingSprite(index) {
	const runnerCells = [
		{ left: 0,   top: 0, width: 47, height: 64 },
		{ left: 55,  top: 0, width: 44, height: 64 },
		{ left: 107, top: 0, width: 39, height: 64 },
		{ left: 150, top: 0, width: 46, height: 64 },
		{ left: 208, top: 0, width: 49, height: 64 },
		{ left: 265, top: 0, width: 46, height: 64 },
		{ left: 320, top: 0, width: 42, height: 64 },
		{ left: 380, top: 0, width: 35, height: 64 },
		{ left: 425, top: 0, width: 35, height: 64 },
	];

	const cell = runnerCells[index];
	context.clearRect(200, 100, cell.width, cell.height);
	context.drawImage(spritesheet, cell.left, cell.top, cell.width, cell.height, 200, 100, cell.width, cell.height);
}

function drawGuidelines(x, y) {
	context.strokeStype = 'rgba(0, 0, 230, 0.8)';
	context.lineWidth = 0.5;
	drawVerticalLine(x);
	drawHorizontalLine(y);
}

function updateReadout(x, y) {
	readout.innerText = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
}

function drawHorizontalLine(y) {
	context.beginPath();
	context.moveTo(0, y + 0.5);
	context.lineTo(context.canvas.width, y + 0.5);
	context.stroke();
}

function drawVerticalLine(x) {
	context.beginPath();
	context.moveTo(x + 0.5, 0);
	context.lineTo(x + 0.5, context.canvas.height);
	context.stroke();
}

canvas.onmousemove = function(e) {
	var loc = windowToCanvas(canvas, e.clientX, e.clientY);

	drawBackground();
	drawingSpritesheet();
	drawGuidelines(loc.x, loc.y);
	updateReadout(loc.x, loc.y);
};

var index = -1;

function drawSprite() {
	index = ((index + 1) % 9);
	drawingSprite(index);
}

spritesheet.src = 'running-sprite-sheet.png';
spritesheet.onload = function(e) {
		drawingSpritesheet();
		setInterval(drawSprite, 100);
}

drawBackground();
