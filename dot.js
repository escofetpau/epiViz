class Dot {
  constructor(home, work, state, infectRatio) {
    this.home = home;
    this.work = work;
    this.pleasure = 0;
    this.state = state;
    this.daysSick = 0;
    this.infectRatio = infectRatio/2;

    // -1 S
    //  0 I
    //  1 R

    this.x = -300;
    this.y = -100;
    this.vel = {x: 0, y: 0};
    this.acc = {x: 0, y: 0};
    this.size = 3;
  }

  newPleasure(nPleasures) {
    this.pleasure = Math.floor(Math.random() * nPleasures);
  }

  infect(){
    this.state = 0;
  }

  recover(){
    this.state = 1;
  }

  nextDay(maxDays) {
    if (this.state === 0) {
      this.daysSick ++;
      if (this.daysSick >= maxDays) {
        this.daysSick = 0;
        this.state = 1;
      }
    }
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
    // Començar el viatge en un step random
    if (this.waitingForStep && this.step === this.startStep) {
      this.startTravel();
      this.waitingForStep = false;
    }
    this.step += 1;

    // Si no està viatjant no fer res més
    if (!this.onTravel) return;
    
    // Si està al mig del viatge invertir l'acceleració
    if (this.travelingFirst && dist(this.pos(), this.destination) <= (this.travelDistance/2)) {
      this.travelingFirst = false;
      this.acc.x = -this.acc.x; 
      this.acc.y = -this.acc.y; 
    }
    
    // Si ha arribat a lloc acabar el viatge
    if (this.onDestination()) {
      this.stop();
      this.x = this.destination.x;
      this.y = this.destination.y;
      this.onTravel = false;
    }

    // Fer update del moviment
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
  }

  goTo(destination, acc, steps) {
    this.startStep = Math.floor(Math.random() * steps); 
    this.destination = destination;
    this.waitingForStep = true;
    this.step = 0;
    this.newAcc = acc;
  }

  startTravel() {
    this.fromPos = this.pos();
    this.setAcc(this.newAcc);
    this.travelingFirst = true; 
    this.onTravel = true;
    this.travelDistance = dist(this.fromPos, this.destination);
  }

  stop() {
    this.vel = {x: 0, y: 0};
    this.acc = {x: 0, y: 0};
  }

  onDestination() {
    let velMod = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
    return dist(this.pos(), this.destination) <= velMod;
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
