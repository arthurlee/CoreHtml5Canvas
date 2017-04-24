var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

const FONT_HEIGHT = 15;
const MARGIN = 35;
const HAND_TRUNCATION = canvas.width / 25;
const HOUR_HAND_TRUNCATION = canvas.width / 5;
const MINUTE_HAND_TRUNCATION = canvas.width / 15;
//const NUMERAL_SPACING = 20;
const NUMERAL_SPACING = -20;
const RADIUS = canvas.width / 2 - MARGIN;	// 半径
const HAND_RADIUS = RADIUS + NUMERAL_SPACING;

const LONG_SCALE_LEN = 10;
const SHORT_SCALE_LEN = 5;

// 钟的外圈
function drawCircle() {
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true);
	context.stroke();	// 外框
}

// 钟的中心
function drawCenter() {
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
	context.fill();	// 填充
}


function drawNumerals() {
	var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	var angle = 0;
	var numeralWidth = 0;

	for (var numeral of numerals) {
		angle = Math.PI / 6 * (numeral - 3);

		// 角度
		// console.log(`${numeral}: angle = ${30 * (numeral - 3)} / ${angle}`);
		// // 补充360度
		// if (angle < 0) {
		// 	angle += Math.PI * 2;
		// }
		// console.log(`${numeral}: angle = ${30 * (numeral - 3)} / ${angle}`);
		
		numeralWidth = context.measureText(numeral).width;
		context.fillText(numeral, 
			canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2,
			canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3
		);
	}
}

// scale 刻度

function drawScale(angle, is_long) {
	let scale_radius = is_long ? RADIUS - LONG_SCALE_LEN : RADIUS - SHORT_SCALE_LEN;	
	var start_x = canvas.width / 2 + Math.cos(angle) * scale_radius;
	var start_y = canvas.height / 2 + Math.sin(angle) * scale_radius;
	var end_x = canvas.width / 2 + Math.cos(angle) * RADIUS;
	var end_y = canvas.height / 2 + Math.sin(angle) * RADIUS;

	context.beginPath();
	context.moveTo(start_x, start_y);
	context.lineTo(end_x, end_y);
	context.stroke();
}

function drawScales() {
	var angle = 0;
	var is_long = false;	// 是否长刻度

	for (var i = 0; i < 60; i++) {
		angle = Math.PI / 30 * (i - 15);
		is_long = (i % 5) == 0 ? true : false;
		drawScale(angle, is_long);
	}
}

function drawHand(loc, radius_truncation){
	var angle = Math.PI * 2 * loc / 60 - Math.PI / 2;
	var handRadius = RADIUS - radius_truncation;

	context.beginPath();
	context.moveTo(canvas.width / 2, canvas.height / 2);
	context.lineTo(
		canvas.width / 2 + Math.cos(angle) * handRadius,
		canvas.height / 2 + Math.sin(angle) * handRadius
	);
	context.stroke();
}

// 时分秒针
function drawHands() {
	var date = new Date();
	var hour = date.getHours() % 12;
	
	drawHand(hour * 5 + (date.getMinutes() / 60) * 5, HAND_TRUNCATION + HOUR_HAND_TRUNCATION);
	drawHand(date.getMinutes(), HAND_TRUNCATION + MINUTE_HAND_TRUNCATION);
	drawHand(date.getSeconds(), HAND_TRUNCATION);
}

function drawClock() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawCircle();
	drawCenter();
	drawNumerals();
	drawScales();
	drawHands();
}

context.font = FONT_HEIGHT + 'px Arial';
//loop = setInterval(drawClock, 1000);
//drawClock();
setInterval(drawClock, 500);
