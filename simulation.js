class Simulation {
    constructor(ndots, infectRatio, infectDuration){
        this.dots = [];
        this.ndots = ndots;
        this.nworks = int(ndots/10);
        this.npleasures = int(ndots/20);
        this.nhomes = int(ndots/4);
        this.infectRatio = infectRatio;
        this.infectDuration = infectDuration;
        this.initializeDots(ndots, nworks);

    }

    filter(field, value) {
        switch (field) {
            case "work":
                let ret = [];
                let infected = false;
                for(let i = 0; i < this.dots.length; i++) {
                    if (this.dots[i].work == value) {
                        ret.push(this.dots[i]);
                        if (this.dots[i].state == 0) {
                            infected = true;
                        }
                    }
                }
                return [infected, ret];

            case "home":
                let ret = [];
                let infected = false;
                for(let i = 0; i < this.dots.length; i++) {
                    if (this.dots[i].home == value) {
                        ret.push(this.dots[i]);
                        if (this.dots[i].state == 0) {
                            infected = true;
                        }
                    }
                }
                return [infected, ret];

            case "pleasure":
                let ret = [];
                let infected = false;
                for(let i = 0; i < this.dots.length; i++) {
                    if (this.dots[i].pleasure == value) {
                        ret.push(this.dots[i]);
                        if (this.dots[i].state == 0) {
                            infected = true;
                        }
                    }
                }
                return [infected, ret];

            default:
                return [false, []];
        }
    }

    initializeDots(ndots, nworks) {
        for(let i = 0; i < ndots; ++i) {
            this.dots[i] = new Dot(int(i/4), int(Math.random() * nworks), -1);
        }
    }

    propagateWork() {
        for(let i = 0; i < this.nworks; ++i) {
            const [infected, workers] = this.filter("work", i);
            if (!infected) continue;
            for(let k = 0; k < workers.length; ++k) {
                if (workers[k].state == 0) {
                    for(let p = 0; p < workers.length; ++p) {
                        if(k != p && workers[p].state == -1) {
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
                if (homers[k].state == 0) {
                    for(let p = 0; p < homers.length; ++p) {
                        if(k != p && homers[p].state == -1) {
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
                if (pleasurers[k].state == 0) {
                    for(let p = 0; p < pleasurers.length; ++p) {
                        if(k != p && pleasurers[p].state == -1) {
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

}