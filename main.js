const d = new DrawTool("myCanvas", window.innerHeight, window.innerWidth);
d.translate(d.width/2, d.height/2);

var dot = new Dot(undefined, undefined, 1);

dot.setAcc(1);
dot.x = -300;
dot.y = -100;
dot.destination = {x: 300, y: 100};

function update() {
    if (dot.onDestination()) dot.stop();
    dot.move();
    d.clearAll();
    dot.show(d);
    
}

d.setInterval(update, 10);