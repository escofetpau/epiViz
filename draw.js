function DrawTool (canvas) {
    this.setup = (canvas) => {
        this.canv = document.getElementById(canvas);
        this.ctx = this.canv.getContext('2d');
        this.width = this.canv.width;
        this.height = this.canv.height;
        this.xOffset = 0;
        this.yOffset = 0;

    }    
    
    if (canvas != undefined) {
        this.setup(canvas);
    }

    this.dot = (x, y, options={color:'red'}) => {
        this.ctx.fillStyle = options.color;
        this.ctx.fillRect(x, y, 1, 1);
    } 
    
    this.rectangle = (x, y, w, h, options) => {

        var opt = initOptions(options)

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

    this.background = (color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0 - this.xOffset, 0 - this.yOffset, this.width, this.height);
    }

    this.translate = (x, y) => {
        this.ctx.translate(x, y);
        this.xOffset += x;
        this.yOffset += y;
    }

    this.circle = (x, y, r, options) => {

        var opt = initOptions(options);

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

    this.line = (x1, y1, x2, y2, options) => {
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

    this.startFillLine = (x, y) => {
        this.ctx.beginPath(); 
        this.ctx.moveTo(x, y);
    };

    this.fillLine = (x, y) => {
        this.ctx.lineTo(x, y);
    }

    this.endFillLine = (options) => {
        if (options === undefined) var opt = {};
        else var opt = options;
        if (opt.color === undefined) opt.color = 'black'; 
        if (opt.width === undefined) opt.width = 1; 
        this.ctx.lineWidth = opt.width;
        this.ctx.fillStyle = opt.color;
        this.ctx.fill();
        this.ctx.closePath();      
    }

    this.clearRect = (x1, y1, x2, y2, color='white') => {
        this.ctx.fillStyle = color;
        this.ctx.clearRect(x1, y1, x2, y2);
    } 
    
    this.clearAll = () => {
        this.ctx.clearRect(0 - this.xOffset, 0 - this.yOffset, this.width, this.height);
    }

    this.setInterval = (fun, frames, clear) => {
        if (clear !== undefined) clearInterval(this.currentInterval);
        this.currentInterval = setInterval(fun, frames);
    }

    this.rotate = (angle) => {
        this.ctx.rotate(angle);
    }
}

function initOptions (options) {
    if (options === undefined) var options = {};
    if (options.color === undefined) options.color = 'black';
    if (options.fill === undefined) options.fill = true;
    if (options.center === undefined) options.center = true;
    if (options.stroke === undefined) options.stroke = false;
    if (options.sWidth === undefined) options.sWidth = 1;
    if (options.sColor === undefined) options.sColor = 'black';            
    return options;
}