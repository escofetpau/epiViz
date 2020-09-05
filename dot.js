class Dot {
  constructor(home, work, state) {
    this.home = home;
    this.work = work;
    this.pleasure = 0;
    this.state = state;
    this.daysSick = 0;

    // -1 S
    //  0 I
    //  1 R

    this.x = 0;
    this.y = 0;
    this.size = 70;
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
}