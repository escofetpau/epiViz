const s = new Simulation(500, 0.05, 10, 30, document);
s.start();
console.log("susceptible: " + s.infected()[0].toString());
console.log("infected: " + s.infected()[1].toString());
console.log("recovered: " + s.infected()[2].toString());

function getInputsAndStart() {
    console.log(document.getElementById("textInput1").value)
    console.log(document.getElementById("textInput2").value)
    console.log(document.getElementById("textInput3").value)
    console.log(document.getElementById("textInput4").value)
}


function closeModal() {
    let modal = document.getElementsByClassName("modal-wrapper")[0];
    modal.style.visibility = "hidden";
}

function openModal() {
    let modal = document.getElementsByClassName("modal-wrapper")[0];
    modal.style.visibility = "visible";
}

