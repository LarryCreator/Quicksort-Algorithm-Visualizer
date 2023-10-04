class Canvas {
    constructor(canvasid, width, height, backgroundColor) {
        this.canvas = document.getElementById(canvasid);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = height;
        this.canvas.width = width;
        this.height =  this.canvas.height;
        this.width = this.canvas.width;
        this.middle = new Vector2d(this.canvas.width / 2, this.canvas.height / 2);
        this.backgroundColor = backgroundColor;
        
    }
    clear() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.strokeStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.height);
        this.ctx.strokeRect(0, 0, this.canvas.width, this.height);

    }
    loop(shouldClear, callback = null) {
        const self = this;
        function animate() {
            if (shouldClear) {
                self.clear();
            }
            if (callback) {
                callback();
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
}

function drawLine(stPos, edPos, ctx, thickness, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(stPos.x, stPos.y);
    ctx.lineTo(edPos.x, edPos.y);
    ctx.stroke();
}
function drawCircle(position, radius, ctx) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2*Math.PI);
    ctx.fill(); // Fill the circle
    ctx.stroke(); // Add a border
}




