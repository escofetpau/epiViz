class Simulation {
    constructor(ndots, infectRatio, infectDuration, simDuration){
        this.dots = [];
        this.ndots = ndots;
        this.nworks = Math.ceil(ndots/10);
        this.npleasures = Math.ceil(ndots/20);
        this.nhomes = Math.ceil(ndots/4);
        this.infectDuration = infectDuration;
        this.step = 0; // 600
        this.simDuration = simDuration;
        this.homePos = [];
        this.workPos = [];
        this.pleasurePos = [];

        this.initializeDots(ndots, this.nworks, infectRatio);
    }

    initializeDots(ndots, nworks, infectRatio) {
        for(let i = 0; i < ndots; ++i) {
            this.dots[i] = new Dot(Math.floor(i/4), Math.floor(Math.random() * nworks), -1, infectRatio);
        }
        this.dots[0].state = 0; // TODO: infectem un dot;
    }

    initializePos() {
        this.initializePosHome();
        this.initializePosWork();
        this.initializePosPleasure();
    }

    initializePosHome() {
        for (let i = 0; i < this.nhomes; i++) {
            this.homePos.push({x: Math.random() * this.d.width - this.d.width/2, y: Math.random() * this.d.height - this.d.height/2}) // {x: 0, y: 0}
        }
    }

    initializePosWork() {
        for (let i = 0; i < this.nhomes; i++) {
            this.workPos.push({x: Math.random() * this.d.width - this.d.width/2, y: Math.random() * this.d.height - this.d.height/2}) // {x: 0, y: 0}
        }
    }

    initializePosPleasure() {
        for (let i = 0; i < this.nhomes; i++) {
            this.pleasurePos.push({x: Math.random() * this.d.width - this.d.width/2, y: Math.random() * this.d.height - this.d.height/2}) // {x: 0, y: 0}
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
                            let infectRatio = workers[k].infectRatio + workers[p].infectRatio;
                            if (Math.random() < infectRatio) {
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
                            let infectRatio = homers[k].infectRatio + homers[p].infectRatio;
                            if (Math.random() < infectRatio) {
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
                            let infectRatio = pleasurers[k].infectRatio + pleasurers[p].infectRatio;
                            if (Math.random() < infectRatio) {
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
            let pos = this.homePos[this.dots[i].home]; // {x: 0, y: 0}
            this.dots[i].goTo(pos, 0.5, 100); // TODO : scale
        }
    }

    start() {
        this.d = new DrawTool("myCanvas", window.innerHeight, window.innerWidth);
        this.d.translate(this.d.width/2, this.d.height/2);
        this.initializePos();

        this.d.setInterval(() => this.update(this), 10);
    }

    update(sym) {
        sym.d.clearAll();

        if(sym.step === 0) sym.propagateHome();
        if(sym.step === 199) sym.homeToWork();

        if(sym.step === 200) sym.propagateWork();
        if(sym.step === 399) sym.workToPleasure();


        if(sym.step === 400) sym.propagatePleasure();
        if(sym.step === 599) sym.pleasureToHome();
        if(sym.step === 599) sym.nextDay();

        sym.step ++;
        if (sym.step >= 600) sym.step = 0;

        sym.moveDots();
        sym.showDots();
    } 

}