const ParentDiv = document.querySelectorAll(".active_border");
const Allcard = document.querySelectorAll(".card");

function OpenPendingProjects(e) {
  for (let index = 0; index < Allcard.length; index++) {
    Allcard[index].classList.remove("active_border");
  }

  e.classList.add("active_border");

  document.getElementById("PendingDiv").style.display = "block";
  document.getElementById("RuningDiv").style.display = "none";
  document.getElementById("SuccessDiv").style.display = "none";
}

function OpenRuningProjects(e) {
  for (let index = 0; index < Allcard.length; index++) {
    Allcard[index].classList.remove("active_border");
  }

  e.classList.add("active_border");

  document.getElementById("PendingDiv").style.display = "none";
  document.getElementById("SuccessDiv").style.display = "none";
  document.getElementById("RuningDiv").style.display = "block";
}

function OpenSuccessFulProjects(e) {
  for (let index = 0; index < Allcard.length; index++) {
    Allcard[index].classList.remove("active_border");
  }

  e.classList.add("active_border");

  document.getElementById("PendingDiv").style.display = "none";
  document.getElementById("RuningDiv").style.display = "none";
  document.getElementById("SuccessDiv").style.display = "block";
}
