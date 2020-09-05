class Dot {
  constructor(home, work, state) {
    this.home = home;
    this.work = work;
    this.state = state;
    // -1 S
    //  0 I
    //  1 R
  }

  infect(){
    this.state = 0;
  }

  recover(){
    this.state = 1;
  }
}