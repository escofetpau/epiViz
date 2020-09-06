

function getInputsAndStart() {
  const people = document.getElementById("textInput1").value;
  const days = document.getElementById("textInput2").value;
  const ratio = document.getElementById("textInput3").value;
  const durationIllnes = document.getElementById("textInput4").value;
  const mask1 = document.getElementById("textInput5").value;
  const distance1 = document.getElementById("textInput6").value;
  const hands1 = document.getElementById("textInput7").value;

  document.getElementById("button").style.visibility = "hidden";

  const control = document.getElementById("control").value;
  let obj = {};
  const mask = document.getElementById("mask").checked;
  const distance = document.getElementById("distance").checked;
  const hands = document.getElementById("hands").checked;

  if (control !== "none") {
    obj = {control, mask, distance, hands};
  } else {
    obj = {control};
  }

  document.getElementById("basic-form").style.visibility = "hidden";
  document.getElementById("control-form").style.visibility = "hidden";

  var text = "Number of people: " + people.toString() + "<br>";
  text += "Number of days: " + days.toString() + "<br>";
  text += "Infection ratio: " + ratio.toString() + "<br>";
  text += "Duration of the illness: " + durationIllnes.toString() + " Days<br>";
  text += "Percentage of masks: " + mask1.toString() + "%<br>";
  text += "Percentage of social distancing: " + hands1.toString() + "%<br>";
  text += "Percentage of hand washing: " + distance1.toString() + "%";

  document.getElementById("summary-basic").innerHTML = text;
  document.getElementById("summary-basic").style.visibility = "visible";

  if (control !== "none") {
    text = "Taking control over a " + control + "<br>";
    if(mask) text += "Wearing a mask <br>";
    if(distance) text += "Keapping the security distance <br>";
    if(hands) text += "Washing hands regularly";

    document.getElementById("summary-control").innerHTML = text;
    document.getElementById("summary-control").style.visibility = "visible";
  }
  
  

  const s = new Simulation(people, ratio, durationIllnes, days, mask1, distance1, hands1, document, obj);
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
