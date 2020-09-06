

function getInputsAndStart() {
  const people = document.getElementById("textInput1").value;
  const days = document.getElementById("textInput2").value;
  const ratio = document.getElementById("textInput3").value;
  const durationIllnes = document.getElementById("textInput4").value;

  document.getElementById("button").style.visibility = "hidden";

  const s = new Simulation(people, ratio, durationIllnes, days, document);
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


var aboutProjText = `
This project is a visualisation of the spreading of a pandemic. We have used a simple epidemiologic model called
<a href="https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model">SIR</a>, which defines 
three states a person can be in: <i>Susceptible, Infectious and Recovered or Removed.</i> This is a simple model 
that is capable of representing a lot of situations that we can find in a pandemic.
<br><br>
In our case, we decided to represent three scenarios. Each person (represented as a dot) has a family, a job, and
goes to different recreational places, which change every day. You can think of these places as a Supermarket, a
bar, a bus, a clothes shop, etc. A person wakes up at home, goes to work, and then goes to a random recreational
location, and in each place interactuates (directly or inderectly, by touching the same things as others) with
every person that is or was there. Each infected person has a probability (infection ratio) of infecting every 
person he has interactuated with. This ratio is based on the sanity measures both interactors are doing, such as
cleaning your hands frequently, wearing mask and keeping social distance.  
<br><br>
`;
var aboutUsText = "Text2";

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
