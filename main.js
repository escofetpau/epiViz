const d = new DrawTool("myCanvas", window.innerHeight, window.innerWidth);
d.translate(d.width/2, d.height/2);

var dot = new Dot(undefined, undefined, 1);

dot.x = -300;
dot.y = -100;

dot.goTo({x: 300, y: 100}, 0.5, 100);

function update() {
    dot.move();
    d.clearAll();
    dot.show(d);
}

d.setInterval(update, 10);

const s = new Simulation(500, 0.05, 10, 30);
s.run();
console.log("susceptible: " + s.infected()[0].toString());
console.log("infected: " + s.infected()[1].toString());
console.log("recovered: " + s.infected()[2].toString());