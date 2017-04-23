var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.font = '38pt Arial';

// CSS格式的颜色、渐变色或是图案
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'cornflowerblue';

const text = 'Hello Canvas';
let x = canvas.width/2 - 150;
let y = canvas.height/2 + 15;

// TODO: 更好的居中文字的方式（在第三章中）
context.fillText(text, x, y);
//context.strokeText('Hello Canvas', canvas.width/2 - 150, canvas.height/2 + 15);

// 立体效果
//context.strokeText('Hello Canvas', canvas.width/2 - 148, canvas.height/2 + 17);

// 更有质感
context.strokeText(text, x - 2, y - 2);
