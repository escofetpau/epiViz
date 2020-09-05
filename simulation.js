class Simulation {
    constructor(ndots, infectRatio, infectDuration, simDuration){
        this.dots = [];
        this.ndots = ndots;
        this.nworks = Math.ceil(ndots/10);
        this.npleasures = Math.ceil(ndots/20);
        this.nhomes = Math.ceil(ndots/4);
        this.infectRatio = infectRatio;
        this.infectDuration = infectDuration;
        this.step = 0; // 600
        this.simDuration = simDuration;

        this.initializeDots(ndots, this.nworks);
        this.initializePos();
    }

    initializeDots(ndots, nworks) {
        for(let i = 0; i < ndots; ++i) {
            this.dots[i] = new Dot(Math.floor(i/4), Math.floor(Math.random() * nworks), -1);
        }
        this.dots[0].state = 0; // TODO: infectem un dot;
    }

    initializePos() {
        this.initializePosHouses();
        this.initializePosWorks();
        this.initializePosPleasure();
    }

    initializePosHouses() {
        for (let i = 0; i < this.nhomes; i++) {
            this.housesPos.push()
        }
    }

    infected() {
        let susceptible = 0;
        let infected = 0;
        let recovered = 0;
        for(let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].state === -1) susceptible ++;
            if (this.dots[i].state === 0) infected ++;
            if (this.dots[i].state === 1) recovered ++;
        }
        return [susceptible, infected, recovered];
    }

    filter(field, value) {
        switch (field) {
            case "work":
                let ret_w = [];
                let infected_w = false;
                for(let i = 0; i < this.dots.length; i++) {
                    if (this.dots[i].work === value) {
                        ret_w.push(this.dots[i]);
                        if (this.dots[i].state === 0) {
                            infected_w = true;
                        }
                    }
                }
                return [infected_w, ret_w];

            case "home":
                let ret_h = [];
                let infected_h = false;
                for(let i = 0; i < this.dots.length; i++) {
                    if (this.dots[i].home === value) {
                        ret_h.push(this.dots[i]);
                        if (this.dots[i].state === 0) {
                            infected_h = true;
                        }
                    }
                }
                return [infected_h, ret_h];

            case "pleasure":
                let ret_p = [];
                let infected_p = false;
                for(let i = 0; i < this.dots.length; i++) {
                    if (this.dots[i].pleasure === value) {
                        ret_p.push(this.dots[i]);
                        if (this.dots[i].state === 0) {
                            infected_p = true;
                        }
                    }
                }
                return [infected_p, ret_p];

            default:
                let infected = 0;
                for(let i = 0; i < this.dots.length; i++) {
                    if (this.dots[i].state === 0) {
                        infected ++;
                    }
                }
                return [false, [infected]];
        }
    }

    propagateWork() {
        for(let i = 0; i < this.nworks; ++i) {
            const [infected, workers] = this.filter("work", i);
            if (!infected) continue;
            for(let k = 0; k < workers.length; ++k) {
                if (workers[k].state === 0) {
                    for(let p = 0; p < workers.length; ++p) {
                        if(k !== p && workers[p].state === -1) {
                            if (Math.random() < this.infectRatio) {
                                workers[p].infect();
                            }                            
                        }
                    }
                }
            }
        }
    }

    propagateHome() {
        for(let i = 0; i < this.nhomes; ++i) {
            const [infected, homers] = this.filter("home", i);
            if (!infected) continue;
            for(let k = 0; k < homers.length; ++k) {
                if (homers[k].state === 0) {
                    for(let p = 0; p < homers.length; ++p) {
                        if(k !== p && homers[p].state === -1) {
                            if (Math.random() < this.infectRatio) {
                                homers[p].infect();
                            }                            
                        }
                    }
                }
            }
        }
    }

    propagatePleasure() {
        this.setPleasures()
        for(let i = 0; i < this.npleasures; ++i) {
            const [infected, pleasurers] = this.filter("pleasue", i);
            if (!infected) continue;
            for(let k = 0; k < pleasurers.length; ++k) {
                if (pleasurers[k].state === 0) {
                    for(let p = 0; p < pleasurers.length; ++p) {
                        if(k !== p && pleasurers[p].state === -1) {
                            if (Math.random() < this.infectRatio) {
                                pleasurers[p].infect();
                            }                            
                        }
                    }
                }
            }
        }
    }

    setPleasures() {
        for(let i = 0; i < this.ndots; ++i) {
            this.dots[i].newPleasure(this.npleasures);
        }
    }

    nextDay() {
        for(let i = 0; i < this.ndots; ++i) {
            this.dots[i].nextDay(this.infectDuration);
        }
    }

    moveDots() {
        for(let i = 0; i < this.ndots; ++i) {
            this.dots[i].move();
        }
    }

    showDots() {
        for(let i = 0; i < this.ndots; ++i) {
            this.dots[i].show(this.d);
        }
    }

    homeToWork() {
        for(let i = 0; i < this.ndots; ++i) {
            let pos = this.workPos[this.dots[i].work]; // {x: 0, y: 0}
            this.dots[i].goTo(pos, 0.5, 100); // TODO : scale
        }
    }

    workToPleasure() {
        for(let i = 0; i < this.ndots; ++i) {
            let pos = this.pleasurePos[this.dots[i].pleasure]; // {x: 0, y: 0}
            this.dots[i].goTo(pos, 0.5, 100); // TODO : scale
        }
    }

    pleasureToHome() {
        for(let i = 0; i < this.ndots; ++i) {
            let pos = this.housesPos[this.dots[i].home]; // {x: 0, y: 0}
            this.dots[i].goTo(pos, 0.5, 100); // TODO : scale
        }
    }

    startSim() {
        this.d = new DrawTool("myCanvas", window.innerHeight, window.innerWidth);
        this.d.translate(this.d.width/2, this.d.height/2);

        this.d.setInterval(this.update, 10);
    }

    update() {
        if(this.step === 0) this.propagateHome();
        if(this.step === 199) this.homeToWork();

        if(this.step === 200) this.propagateWork();
        if(this.step === 399) this.workToPleasure();


        if(this.step === 400) this.propagatePleasure();
        if(this.step === 599) this.pleasureToHome();
        if(this.step === 599) this.nextDay();

        this.step ++;
        if (this.step >= 600) this.step = 0;

        this.moveDots();
        this.showDots();
    } 

}