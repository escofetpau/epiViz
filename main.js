const d = new DrawTool("myCanvas", window.innerHeight, window.innerWidth);
d.translate(d.width/2, d.height/2);
d.background("green");

var dot = new Dot(undefined, undefined, 1);

dot.show(d);

const s = new Simulation(500, 0.05, 10, 30);
s.run();
console.log("susceptible: " + s.infected()[0].toString());
console.log("infected: " + s.infected()[1].toString());
console.log("recovered: " + s.infected()[2].toString());