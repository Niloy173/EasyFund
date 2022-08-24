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
