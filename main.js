

function getInputsAndStart() {
  const people = document.getElementById("textInput1").value;
  const days = document.getElementById("textInput2").value;
  const ratio = document.getElementById("textInput3").value;
  const durationIllnes = document.getElementById("textInput4").value;

  document.getElementById("button").style.visibility = "hidden";

  const s = new Simulation(people, ratio, durationIllnes, days, document);
  s.start();
}


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
