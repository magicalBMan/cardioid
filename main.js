/* esversion: 6 */
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
let background_Color = '#222';
let RADIUS = canvas.height / 2 - 32;
let total = 400;
let factor = 3;

window.addEventListener('resize', function () {
    canvas.height = window.innerHeight - 1;
    canvas.width = window.innerWidth - 1;

    init();
});

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let points = [];

function init() {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.arc(0, 0, RADIUS, 0, Math.PI * 2, false);
    ctx.stroke();

    for (let i = 0; i < total; i++) {
        let angle = interpolate(i, 0, total, 0, Math.PI * 2);
        let x = RADIUS * Math.cos(angle);
        let y = RADIUS * Math.sin(angle);
        points.push(new Point(x, y));
    }

    for(let i = 0; i < total; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);

        let end = (i * factor) % total;
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.lineTo(points[end].x, points[end].y);
        ctx.stroke();
    }
}

function interpolate(value, min1, max1, min2, max2) {
    return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}
init();