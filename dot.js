class Dot {
  constructor(home, work, state) {
    this.home = home;
    this.work = work;
    this.pleasure = 0;
    this.state = state;

    // -1 S
    //  0 I
    //  1 R

    this.x = -300;
    this.y = -100;
    this.vel = {x: 0, y: 0};
    this.acc = {x: 0, y: 0};
    this.size = 30;
    this.destination = {x: 300, y: 100};
  }

  newPleasure(nPleasures) {
    this.pleasure = int(Math.random() * nPleasures);
  }

  infect(){
    this.state = 0;
  }

  recover(){
    this.state = 1;
  }

  /*
  @param DrawTool d 
  */
  show(d) {
    d.circle(this.x, this.y, this.size, {color: this.stateColor()});
  }

  stateColor() {
    if (this.state === -1) return "green";
    if (this.state === 0) return "red";
    if (this.state === 1) return "blue";
  }

  setAcc(acc) {
    let vector = {x: this.destination.x - this.x, y: this.destination.y - this.y};
    let modul = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    this.acc = {x: vector.x * acc / modul, y: vector.y * acc / modul};

  }

  move() {
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  goTo(destination, acc) {
    this.fromPos = this.pos();
    this.travelDistance = dist(this.fromPos, destination);
    this.destination = destination;
    this.setAcc(acc);
  }

  stop() {
    this.vel = {x: 0, y: 0};
    this.acc = {x: 0, y: 0};
  }

  onDestination() {
    console.log(dist(this.pos(), this.destination));
    return dist(this.pos(), this.destination) < 3;
  }

  pos() {
    return {x: this.x, y: this.y}
  }
}

function dist (A, B) {
  let c = A.x - B.x; 
  let d = A.y - B.y; 
  return Math.sqrt(c*c + d*d);
}
