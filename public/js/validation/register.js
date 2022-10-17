// function CheckEmail(obj) {
//   if (obj.value.split("@")[1] != "diu.edu.bd") {
//     document.getElementById("msg").innerText =
//       "provide your university  email address";
//     document.getElementById("msg").style.display = "block";
//   } else {
//     document.getElementById("msg").style.display = "none";
//   }
// }

function CheckUsername(obj) {
  let curr_length = obj.value.length;
  if (curr_length > 20) {
    document.getElementById("msg").innerText =
      "username should be less then 20 character";
    document.getElementById("msg").style.display = "block";
  } else {
    document.getElementById("msg").style.display = "none";
  }
}

function CheckPassword(obj) {
  let curr_length = obj.value.length;
  if (curr_length < 8) {
    document.getElementById("msg").innerText =
      "please provide atleast 8 digit password";
    document.getElementById("msg").style.display = "block";
  } else {
    document.getElementById("msg").style.display = "none";
  }
}

function ConfirmPassword(obj) {
  let actual_pass = document.getElementById("user-pass").value;
  if (obj.value != actual_pass) {
    document.getElementById("msg").innerText = "password didn't match properly";
    document.getElementById("msg").style.display = "block";
    document.getElementById("submit-form").style.cursor = "no-drop";
    document.getElementById("submit-form").disabled = true;
  } else {
    document.getElementById("msg").style.display = "none";
    document.getElementById("submit-form").disabled = false;
    document.getElementById("submit-form").style.cursor = "pointer";
  }
}
