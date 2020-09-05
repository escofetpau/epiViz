const s = new Simulation(500, 0.05, 10, 30, document);
s.start();
console.log("susceptible: " + s.infected()[0].toString());
console.log("infected: " + s.infected()[1].toString());
console.log("recovered: " + s.infected()[2].toString());

console.log(document.getElementById("textInput1").value)
console.log(document.getElementById("textInput2").value)
console.log(document.getElementById("textInput3").value)
console.log(document.getElementById("textInput4").value)

function closeModal() {
    let modal = document.getElementsByClassName("modal-wrapper")[0];
    modal.style.visibility = "hidden";
}

function openModal() {
    let modal = document.getElementsByClassName("modal-wrapper")[0];
    modal.style.visibility = "visible";
}

var aboutProjText = "Text1";
var aboutUsText = "Text2";

function checkChoice(id) {
    let otherId;
    let contentText;
    if (id === "aboutProj") {
        otherId = "aboutUs";
        contentText = aboutProjText; 
    }
    else {
        otherId = "aboutProj";
        contentText = aboutUsText; 
    } 

    let clicked = document.getElementById(id);
    let other = document.getElementById(otherId);

    clicked.style.backgroundColor = "black";
    clicked.style.color = "white";

    other.style.backgroundColor = "white";
    other.style.color = "black";

    document.getElementById("contentText").innerText = contentText;
}
