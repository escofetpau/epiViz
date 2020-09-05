class Simulation {
    constructor(ndots, infectRatio, infectDuration, simDuration, phase){
        this.dots = [];
        this.ndots = ndots;
        this.nworks = Math.ceil(ndots/10);
        this.npleasures = Math.ceil(ndots/5);
        this.nhomes = Math.ceil(ndots/4);
        this.infectDuration = infectDuration;
        this.totalInfectRatio = infectRatio;
        this.step = 0;
        this.symSteps = 0;
        this.nsteps = 600;
        this.simDuration = simDuration;
        this.homePos = [];
        this.workPos = [];
        this.pleasurePos = [];
        this.arrFib = [];
        this.phaseText = phase;

        this.chartData = [
            {
                type: "stackedArea100",
                name: "Infected",
                showInLegend: "true",
                dataPoints: []
            },
            {
                type: "stackedArea100",
                name: "Susceptibles",
                showInLegend: "true",
                dataPoints: []
            },
            {
                type: "stackedArea100",
                name: "Recovered",
                showInLegend: "true",
                dataPoints: []
        }];
    }

    initializeDots() {
        for(let i = 0; i < this.ndots; ++i) {
            this.dots[i] = new Dot(Math.floor(i/4), Math.floor(Math.random() * this.nworks), -1, this.totalInfectRatio, this.homePos);
        }
        this.dots[0].state = 0; // TODO: infectem un dot;
    }

    initialize() {
        this.initializePosHome();
        this.initializeDots();
        this.initializePosWork();
        this.initializePosPleasure();

        this.addColorsCanvasJS();

        this.resetArrFib();
    }

    initializePosHome() {
        for (let i = 0; i < this.nhomes; i++) {
            this.homePos.push({x: Math.random() * this.d.width - this.d.width/2, y: Math.random() * this.d.height - this.d.height/2});
        }
    }

    initializePosWork() {
        for (let i = 0; i < this.nhomes; i++) {
            this.workPos.push({x: Math.random() * this.d.width - this.d.width/2, y: Math.random() * this.d.height - this.d.height/2});
        }
    }

    initializePosPleasure() {
        for (let i = 0; i < this.nhomes; i++) {
            this.pleasurePos.push({x: Math.random() * this.d.width - this.d.width/2, y: Math.random() * this.d.height - this.d.height/2});
        }
    }

    addColorsCanvasJS() {
        CanvasJS.addColorSet("greenShades",
            [
                "#e76f51",
                "#2a9d8f",
                "#b0b5ae"            
            ]);
    }

    infected() {
        let infected = 0;
        let susceptible = 0;
        let recovered = 0;
        for(let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].state === -1) susceptible ++;
            if (this.dots[i].state === 0) infected ++;
            if (this.dots[i].state === 1) recovered ++;
        }
        return [infected, susceptible, recovered];
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
        this.plotChart();
        this.resetArrFib();
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
        this.plotChart();
        this.resetArrFib();
    }

    propagatePleasure() {
        for(let i = 0; i < this.npleasures; ++i) {
            const [infected, pleasurers] = this.filter("pleasure", i);
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
        this.plotChart();
        this.resetArrFib();
    }

    setPleasures() {
        for(let i = 0; i < this.ndots; ++i) {
            this.dots[i].newPleasure(this.npleasures);
        }
    }

    nextPhase() {
        for(let i = 0; i < this.ndots; ++i) {
            this.dots[i].nextPhase(this.infectDuration*3);
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
        this.phaseText.querySelector('.phase').innerHTML = "Going to Work &#127891";
        for(let i = 0; i < this.ndots; ++i) {
            let pos = this.calculate_pos(this.workPos[this.dots[i].work], this.dots[i].work);
            this.dots[i].goTo(pos, 0.5, this.nsteps/6); // TODO : scale
        }
    }

    workToPleasure() {
        this.phaseText.querySelector('.phase').innerHTML = "Going to Chill &#128131";
        for(let i = 0; i < this.ndots; ++i) {
            let pos = this.calculate_pos(this.pleasurePos[this.dots[i].pleasure], this.dots[i].pleasure);
            this.dots[i].goTo(pos, 0.5, this.nsteps/6); // TODO : scale
        }
    }

    pleasureToHome() {
        this.phaseText.querySelector('.phase').innerHTML = "Going Home &#127968";
        for(let i = 0; i < this.ndots; ++i) {
            let pos = this.calculate_pos(this.homePos[this.dots[i].home], this.dots[i].home);
            this.dots[i].goTo(pos, 0.5, this.nsteps/6); // TODO : scale
        }
    }

    start() {
        this.d = new DrawTool("myCanvas", window.innerHeight, window.innerWidth);
        this.d.translate(this.d.width/2, this.d.height/2);
        this.initialize();

        this.d.setInterval(() => this.update(this), 10);
    }

    stop() {
        this.d.clearInterval();
    }

    update(sym) {
        sym.d.clearAll();
        sym.d.background("#264653");

        if(sym.step === 0) {
            sym.propagateHome();
            sym.nextPhase();
        }
        if(sym.step === this.nsteps/3 -1) sym.homeToWork();

        if(sym.step === this.nsteps/3) {
            sym.propagateWork();
            sym.nextPhase();
        }
        if(sym.step === 2*this.nsteps/3 -1) {
            this.setPleasures();
            sym.workToPleasure();
        }

        if(sym.step === 2*this.nsteps/3) {
            sym.propagatePleasure();
            sym.nextPhase();
        }
        if(sym.step === this.nsteps -1) sym.pleasureToHome();

        sym.step ++;
        sym.symSteps ++;
        if (sym.step >= this.nsteps) sym.step = 0;

        sym.moveDots();
        sym.showDots();
    } 

    updateDataChart(){
        let day = Math.floor(this.symSteps / this.nsteps);
        let result = this.infected();

        this.chartData[0].dataPoints.push({y: result[0], label: day.toString()});
        this.chartData[1].dataPoints.push({y: result[1], label: day.toString()});
        this.chartData[2].dataPoints.push({y: result[2], label: day.toString()});
    }

    plotChart() {
        this.updateDataChart();
        var chart = new CanvasJS.Chart("chartContainer", {
        colorSet: "greenShades",
        backgroundColor: "#264653",
        legend : {
            fontColor: "#b0b5ae",
        },
        animationEnabled: false,
        axisX:{
            title: "Days",
            labelFontColor: "#b0b5ae",
            minimum: -0.02,
            titleFontColor: "#b0b5ae"
        },
        axisY:{
            title:"Population",
            labelFontColor: "#b0b5ae",
            titleFontColor: "#b0b5ae"
        },
        toolTip:{
            shared: true
        },
        data: this.chartData
        });
        chart.render();
        document.getElementsByClassName("canvasjs-chart-credit")[0].remove();
    }

    calculate_pos(pos, elem) {
        let i = this.arrFib[elem];
        this.arrFib[elem] ++;
        let pos2 = this.fibonacci_spiral_disc_i(i);
        return {x: pos.x + pos2.x, y: pos.y + pos2.y};
    }

    resetArrFib() {
        for (let i = 0; i < this.ndots; i++) {
            this.arrFib[i] = 0;
        }
    }

    fibonacci_spiral_disc (num_points, k) {
        var positions = [];
        let gr = 1.6180339887498948482 
        let ga = 2.39996322972865332   
    
        for (let i = 1; i <= num_points; ++i) {
            const r = Math.sqrt(i) * k;
            const theta = ga * i;
    
            const x = Math.cos(theta) * r;
            const y = Math.sin(theta) * r;
    
            positions.push({x, y});
        }
        return positions;
    }

    fibonacci_spiral_disc_i (i) {
        const k = 5;
        let gr = 1.6180339887498948482
        let ga = 2.39996322972865332
        const r = Math.sqrt(i) * k;
        const theta = ga * i;
        const x = Math.cos(theta) * r;
        const y = Math.sin(theta) * r;
        return {x, y};    
    }
}
