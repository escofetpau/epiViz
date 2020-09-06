

function getInputsAndStart() {
  const people = document.getElementById("textInput1").value;
  const days = document.getElementById("textInput2").value;
  const ratio = document.getElementById("textInput3").value;
  const durationIllnes = document.getElementById("textInput4").value;

  document.getElementById("button").style.visibility = "hidden";

  const control = document.getElementById("control").value;
  let obj = {};

  if (control !== "none") {
    const mask = document.getElementById("mask").checked;
    const distance = document.getElementById("distance").checked;
    const hands = document.getElementById("hands").checked;

    obj = {control, mask, distance, hands};
  } else {
    obj = {control};
  }

  document.getElementById("control-form").style.visibility = "hidden";

  const s = new Simulation(people, ratio, durationIllnes, days, document, obj);
  s.start();
}

function clearScreen() {
  location.reload();
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
var aboutUsText = `We are a group of 3 students of the Polytechnic University of Barcelona (UPC). <br> 
                  We have been attending to different hackathons during the past year, and love to make projects 
                  together. To find out more about us, visit our websites: <br>
                  <a target = "_blank" href = "https://pauescofet.com/">Pau</a> <br>
                  <a target = "_blank" href = "http://marcamoros.me/">Marc</a> <br>
                  <a target = "_blank" href = "https://www.linkedin.com/in/nicolas-camerlynck-segarra-9220bb169/">Nicolas</a>`;

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

    document.getElementById("contentText").innerHTML = contentText;
}
