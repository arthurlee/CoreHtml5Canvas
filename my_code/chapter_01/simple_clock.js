var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

const FONT_HEIGHT = 15;
const MARGIN = 35;
const HAND_TRUNCATION = canvas.width / 25;
const HOUR_HAND_TRUNCATION = canvas.width / 10;
const NUMERAL_SPACING = 20;
const RADIUS = canvas.width / 2 - MARGIN;	// 半径
const HAND_RADIUS = RADIUS + NUMERAL_SPACING;

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
		console.log(`${numeral}: angle = ${30 * (numeral - 3)} / ${angle}`);
		// 补充360度
		if (angle < 0) {
			angle += Math.PI * 2;
		}
		console.log(`${numeral}: angle = ${30 * (numeral - 3)} / ${angle}`);
		
		numeralWidth = context.measureText(numeral).width;
		context.fillText(numeral, 
			canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2,
			canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3
		);
	}
}


function drawHand(loc, isHour){

}

function drawHands() {
	var date = new Date();
	var hour = date.getHours();
}

function drawClock() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawCircle();
	drawCenter();
	drawNumerals();
	//drawHands();
}

context.font = FONT_HEIGHT + 'px Arial';
//loop = setInterval(drawClock, 1000);
drawClock();
