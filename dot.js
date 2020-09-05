class Dot {
  constructor(home, work, state) {
    this.home = home;
    this.work = work;
    this.pleasure = 0;
    this.state = state;

    // -1 S
    //  0 I
    //  1 R

    this.x = 300;
    this.y = 300;
    this.size = 10;
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
}