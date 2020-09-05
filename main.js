const d = new DrawTool("myCanvas");
d.setHeight(window.innerHeight);
d.setWidth(window.innerWidth);
d.background("green");


var dot = new Dot(undefined, undefined, 1);

dot.show(d);