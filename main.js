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
window.addEventListener('click',function(evt) {
    factor++;
    total = 10;
    console.log(`Factor: ${factor} Total: ${total}`);
});
window.oncontextmenu = function() {
    go = !go;
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let points = [];

function init() {
    points = [];
    ctx.beginPath();
    ctx.strokeStyle = design_Color;
    ctx.lineWidth = 1;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.arc(0, 0, RADIUS, 0, Math.PI * 2, false);
    ctx.stroke();
    

    for (let i = 0; i < total; i++) {
        let angle = interpolate(i, 0, total, 0, Math.PI * 2);
        let x = RADIUS * Math.cos(angle + Math.PI);
        let y = RADIUS * Math.sin(angle);
        points.push(new Point(x, y));
    }

    for(let i = 0; i < total; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        let red = interpolate(i, 0, total / 3, 100, 255);
        let green = interpolate(i, total / 3, 2 * total / 3, 100, 255)
        let end = (i * factor) % total;
        ctx.strokeStyle = getRGB(green, red, green);
        ctx.lineWidth = 1;
        ctx.lineTo(points[end].x, points[end].y);
        ctx.stroke();
    }
}

function getRGB(r,g,b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
function interpolate(value, min1, max1, min2, max2) {
    return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = background_Color;
    ctx.translate(-innerWidth / 2,-innerHeight / 2);
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    if(go) {
        if(total <= 1000) total++;
    }
    init();
}
init();
animate();