const CreationDate = document.getElementById("creationDate");
const Validity = document.getElementById("project_validity");
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

const CurrentAmount = parseInt(
  document.getElementById("curr_amount").innerText
);
const TargetAmount = parseInt(document.getElementById("goal").innerText);

/* three button */
const SuccessBtn = document.getElementById("success");
const FailureBtn = document.getElementById("failure");
const FundedBtn = document.getElementById("funded");

(function () {
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
    ProjectEndMessage.style.display = "flex";
  }
  if (parseInt(Validity.innerText) >= 0 && CurrentAmount >= TargetAmount) {
    // days remaining or ended though project's successful
    SuccessBtn.style.display = "block";
  } else if (
    parseInt(Validity.innerText) == 0 &&
    CurrentAmount < TargetAmount &&
    CurrentAmount != 0
  ) {
    // days ended and amount not reached or fulfilled
    FundedBtn.style.display = "block";
  } else if (parseInt(Validity.innerText) == 0 && CurrentAmount === 0) {
    // project failure
    FailureBtn.style.display = "block";
  }
})();

SuccessBtn.addEventListener("click", function () {
  const current_url = window.location.href.split("/");
  const projectId = current_url[current_url.length - 1];

  fetch(`/admin-pannel/preview/${projectId}/success`, {
    method: "POST",
  });

  setTimeout(() => {
    window.location.replace("/admin-pannel/dashboard");
  }, 1000);
});

FundedBtn.addEventListener("click", function () {
  const current_url = window.location.href.split("/");
  const projectId = current_url[current_url.length - 1];

  fetch(`/admin-pannel/preview/${projectId}/funded`, {
    method: "POST",
  });

  setTimeout(() => {
    window.location.replace("/admin-pannel/dashboard");
  }, 1000);
});

FailureBtn.addEventListener("click", function () {
  const current_url = window.location.href.split("/");
  const projectId = current_url[current_url.length - 1];

  fetch(`/admin-pannel/preview/${projectId}/failure`, {
    method: "POST",
  });

  setTimeout(() => {
    window.location.replace("/admin-pannel/dashboard");
  }, 1000);
});
