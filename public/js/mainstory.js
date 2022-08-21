const Validity = document.getElementById("project_validity");
const CreationDate = document.getElementById("creationDate");
const supportSection = document.getElementById("support-box");
const ProjectEndMessage = document.getElementById("project_end_message");

/* this functionality determines how much amount the selected project already gained */
const target_amount = parseInt(document.getElementById("goal").innerHTML);
const curr_amount = parseInt(document.getElementById("curr_amount").innerHTML);
const Getting_percentage = (curr_amount / target_amount) * 100;
document.getElementById("progress").value += Getting_percentage;

window.setTimeout(function () {
  document.getElementById("mainStory").style.height =
    document.getElementById("mainStory").scrollHeight + "px";
});

function ScrollDown() {
  window.scrollTo(0, document.body.scrollHeight);
}

function CopyLink() {
  const checker = document
    .getElementById("copy-btn")
    .innerHTML.toLowerCase.toString();

  let link_box = document.getElementById("project-link");
  link_box.select();
  navigator.clipboard.writeText(link_box.value);

  if (checker != "copied") {
    document.getElementById("copy-btn").innerHTML = "copied";
  }
}

CountDays();
function CountDays() {
  const ProjectDate = CreationDate.innerText.split("/");
  const CurrentDate = new Date();

  const newDate = new Date(
    ProjectDate[0] + "/" + ProjectDate[1] + "/" + ProjectDate[2]
  );

  const UTC1 = Date.UTC(
    CurrentDate.getFullYear(),
    CurrentDate.getMonth(),
    CurrentDate.getDate()
  );
  const UTC2 = Date.UTC(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDate()
  );

  const Days = Math.floor((UTC1 - UTC2) / (3600 * 24 * 1000));
  Validity.innerHTML =
    parseInt(Validity.innerText) - Days > 0
      ? parseInt(Validity.innerText) - Days
      : 0;

  if (parseInt(Validity.innerText) === 0 || curr_amount >= target_amount) {
    supportSection.style.display = "none";
    ProjectEndMessage.style.display = "flex";
  }
}
