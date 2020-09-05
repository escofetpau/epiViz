

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

