var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.font = '38pt Arial';
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'cornflowerblue';

context.fillText('Hello Canvas', canvas.width/2 - 150, canvas.height/2 + 15);
//context.strokeText('Hello Canvas', canvas.width/2 - 150, canvas.height/2 + 15);

// 立体效果
//context.strokeText('Hello Canvas', canvas.width/2 - 148, canvas.height/2 + 17);

// 更有质感
context.strokeText('Hello Canvas', canvas.width/2 - 152, canvas.height/2 + 13);
