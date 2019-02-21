/*jshint esversion: 6 */
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
let background_Color = '#FFF';
let design_Color = 'black';
let RADIUS = canvas.height / 2 - 32;
let total = 10;
let factor = 2;
let go = false;

window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    init();
});
document.onkeydown = function (evt) {
    switch (evt.keyCode) {
        case 37:
            //left
            total--;
            break;
        case 38:
            //Up
            factor++;
            break;
        case 39:
            //Right
            total++;
            break;
        case 40:
            //Down
            factor--;
            break;
        case 32:
            //space
            go = !go;
            break;
    }
    init();
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let points = [];

function init() { 
    ctx.fillStyle = 'black';
    ctx.font = '18px Arial';
    ctx.fillText('RIGHT to increase number of points', 10, 50);
    ctx.fillText('LEFT to decrease number of points', 10, 30);
    ctx.fillText('UP to increase factor', 10, 70);
    ctx.fillText('DOWN to decrease factor', 10, 90);
    ctx.fillText('SPACE to animate', 10, 110);
    ctx.fillText('TOTAL number of points: ' + total, 10, 150);
    ctx.fillText('Factor Value: ' + factor, 10, 170);

    points = [];
    ctx.beginPath();
    ctx.strokeStyle = design_Color;
    ctx.lineWidth = 1;
    ctx.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, false);
    ctx.stroke();

    for (let i = 0; i < total; i++) {
        let angle = interpolate(i, 0, total, 0, Math.PI * 2);
        let x = RADIUS * Math.cos(angle + Math.PI);
        let y = RADIUS * Math.sin(angle);
        points.push(new Point(x + canvas.width / 2, y + canvas.height / 2));
    }

    for (let i = 0; i < total; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        let hue = interpolate(i, 0, total, 0, 355);

        let end = (i * factor) % total;

        ctx.strokeStyle = getHSL(hue, 100, 50);
        ctx.lineWidth = 3;
        ctx.lineTo(points[end].x, points[end].y);
        ctx.stroke();
    }
    // ctx.Translate(-canvas.width / 2, -canvas.height / 2);
}

function getHSL(h, s, l) {
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

function interpolate(value, min1, max1, min2, max2) {
    return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = background_Color;
    // ctx.translate(-innerWidth / 2, -innerHeight / 2);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (go) {
        if (total <= 1500 ) total++;
    }
    init();
}
init();
animate();