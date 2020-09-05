// Author: Marc Amorós
// Email: marc.amoros.trepat@gmail.com

var DrawTool = function (canvas, height, width) {
    if (canvas !== undefined) this.setup(canvas);
    if (height !== undefined) this.setHeight(height);
    if (width !== undefined) this.setWidth(width);
}

DrawTool.prototype.setup = function (canvas) {
    this.canv = document.getElementById(canvas);
    this.ctx = this.canv.getContext('2d');
    this.width = this.canv.width;
    this.height = this.canv.height;
    this.xOffset = 0;
    this.yOffset = 0;

}    

DrawTool.prototype.setHeight = function (height) {
    this.canv.height = height;
    this.width = this.canv.width;
    this.height = this.canv.height;
}

DrawTool.prototype.setWidth = function (width) {
    this.canv.width = width;
    this.width = this.canv.width;
    this.height = this.canv.height;
}

DrawTool.prototype.dot = function (x, y, options={color:'red'}) {
    this.ctx.fillStyle = options.color;
    this.ctx.fillRect(x, y, 1, 1);
} 
    
DrawTool.prototype.rectangle = function (x, y, w, h, options) {
    var opt = this.initOptions(options)

    this.ctx.fillStyle = opt.color;
    var posX, posY;
    if (opt.center) {
        posX = x - w/2;
        posY = y - h/2;
    }
    else {
        posX = x;
        posY = y;
    }

    if (opt.fill) this.ctx.fillRect(posX, posY, w, h);

    if (opt.stroke) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = opt.sColor;
        this.ctx.lineWidth = opt.sWidth;
        this.ctx.strokeRect(posX, posY, w, h);
        this.ctx.closePath();        
    }
}

DrawTool.prototype.background = function (color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0 - this.xOffset, 0 - this.yOffset, this.width, this.height);
}

DrawTool.prototype.translate = function (x, y) {
    this.ctx.translate(x, y);
    this.xOffset += x;
    this.yOffset += y;
}

DrawTool.prototype.circle = function (x, y, r, options) {

    var opt = this.initOptions(options);

    this.ctx.beginPath();
    this.ctx.fillStyle = opt.color;
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (opt.fill) {
        this.ctx.fill();
    }
    if (opt.stroke) {  
        this.ctx.strokeStyle = opt.sColor;
        this.ctx.lineWidth = opt.sWidth;
        this.ctx.stroke();
    }
    this.ctx.closePath();        
}

DrawTool.prototype.line = function (x1, y1, x2, y2, options) {
    if (options === undefined) var opt = {};
    else var opt = options;
    if (opt.color === undefined) opt.color = 'black'; 
    if (opt.width === undefined) opt.width = 1; 

    this.ctx.beginPath(); 
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = opt.width;
    this.ctx.strokeStyle = opt.color; 
    this.ctx.stroke(); 
    this.ctx.closePath();        
}

DrawTool.prototype.startFillLine = function (x, y) {
    this.ctx.beginPath(); 
    this.ctx.moveTo(x, y);
}

DrawTool.prototype.fillLine = function (x, y) {
    this.ctx.lineTo(x, y);
}

DrawTool.prototype.endFillLine = function (options) {
    if (options === undefined) var opt = {};
    else var opt = options;
    if (opt.color === undefined) opt.color = 'black'; 
    if (opt.width === undefined) opt.width = 1; 
    this.ctx.lineWidth = opt.width;
    this.ctx.fillStyle = opt.color;
    this.ctx.fill();
    this.ctx.closePath();      
}

DrawTool.prototype.clearRect = function (x1, y1, x2, y2, color='white') {
    this.ctx.fillStyle = color;
    this.ctx.clearRect(x1 - this.xOffset, y1 - this.yOffset, x2 - this.xOffset, y2 - this.yOffset);
} 
    
DrawTool.prototype.clearAll = function () {
    this.ctx.clearRect(0 - this.xOffset, 0 - this.yOffset, this.width, this.height);
}

DrawTool.prototype.setInterval = function (fun, frames) {
    this.currentInterval = setInterval(fun, frames);
}

DrawTool.prototype.clearInterval = function () {
    clearInterval(this.currentInterval);
}

DrawTool.prototype.rotate = function (angle) {
    this.ctx.rotate(angle);
}

DrawTool.prototype.initOptions = function (options) {
    if (options === undefined) var options = {};
    if (options.color === undefined) options.color = 'black';
    if (options.fill === undefined) options.fill = true;
    if (options.center === undefined) options.center = true;
    if (options.stroke === undefined) options.stroke = false;
    if (options.sWidth === undefined) options.sWidth = 1;
    if (options.sColor === undefined) options.sColor = 'black';            
    return options;
}