const d = new DrawTool("myCanvas", window.innerHeight, window.innerWidth);
d.translate(d.width/2, d.height/2);
d.background("green");

var dot = new Dot(undefined, undefined, 1);

dot.show(d);