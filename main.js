let s;

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
  const nPeople = document.getElementById("nPeople").value;

  if (control !== "none") {
    obj = {control, mask, distance, hands, nPeople};
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
  
  
  document.getElementById("button3").style.visibility = "visible";

  s = new Simulation(people, ratio, durationIllnes, days, mask1, distance1, hands1, document, obj);
  s.start();
}

function stopSym() {
  s.stop();
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


var aboutProjText = `
This project is a visualization of the spreading of a pandemic. We have used a simple epidemiologic model called
<a href="https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model">SIR</a>, which defines 
three states a person can be in: <i>Susceptible, Infectious and Recovered or Removed.</i> This is a simple model 
that is capable of representing a lot of situations that we can find in a pandemic.
<br><br>
In our case, we decided to represent three scenarios. Each person (represented as a dot) has a family, a job, and
goes to different recreational places, which change every day. You can think of these places as a Supermarket, a
bar, a bus, a clothes shop, etc. A person wakes up at home, goes to work, and then goes to a random recreational
location, and in each place interacts (directly or indirectly, by touching the same things as others) with
every person that is or was there. Each infected person has a probability (infection ratio) of infecting every 
person he has interacted with. This ratio is based on the sanity measures both interactors are doing, such as
cleaning your hands frequently, wearing mask and keeping social distance.  
<br><br>

`;
var aboutUsText = `We are a group of 3 students of the Polytechnic University of Barcelona (UPC). <br> 
                  We have been attending to different hackathons during the past year, and love to make projects 
                  together. To find out more about us, visit our websites: <br>
                  <a target = "_blank" href = "https://pauescofet.com/">Pau</a> <br>
                  <a target = "_blank" href = "http://marcamoros.me/">Marc</a> <br>
                  <a target = "_blank" href = "https://www.linkedin.com/in/nicolas-camerlynck-segarra-9220bb169/">Nicolas</a>`;

document.getElementById("contentText").innerHTML = aboutProjText;


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
