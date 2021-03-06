class Dot {
  constructor(home, work, state, infectRatio, initPos) {
    this.home = home;
    this.work = work;
    this.pleasure = 0;
    this.state = state;
    this.phasesSick = 0;
    this.infectRatio = parseFloat(infectRatio);
    this.focus = false;

    // -1 S
    //  0 I
    //  1 R

    this.x = initPos.x;
    this.y = initPos.y;

    this.vel = {x: 0, y: 0};
    this.acc = {x: 0, y: 0};
    this.size = 3;
    this.step = 0;
    
    this.vibrateFase = Math.random() * Math.PI * 2;
    this.vibrateAngle = Math.random() * Math.PI * 2;
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

  nextPhase(maxPhases) {
    if (this.state === 0) {
      this.phasesSick ++;
      if (this.phasesSick >= maxPhases) {
        this.phasesSick = 0;
        this.state = 1;
      }
    }
  }

  /*
  @param DrawTool d 
  */
  show(d) {
    d.circle(this.x, this.y, this.size, {color: this.stateColor()});
    if (this.focus) d.circle(this.x, this.y, this.size + 2, {sColor: "yellow", fill: false, stroke: true});
  }

  stateColor() {
    if (this.state === -1) return "#2a9d8f";
    if (this.state === 0) return "#e76f51";
    if (this.state === 1) return "#b0b5ae";
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
    if (!this.onTravel) {
      this.x += this.vibrateAngle * 0.05 * Math.sin(this.vibrateFase + this.step * 0.2);
      this.y += this.vibrateAngle * 0.05 * Math.cos(this.vibrateFase + this.step * 0.2);
      return;
    }
    
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
