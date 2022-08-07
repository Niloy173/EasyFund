const title = document.getElementById("title");
const story = document.getElementById("content-story");
const Form = document.getElementById("storyForm");
const submitBtn = document.getElementById("next");
const file_input = document.getElementById("file-input"); // for selecting images
const content_image = document.getElementById("content-image"); // image Gallery container

// // preventing refresh form submission
// window.onbeforeunload = (e) => {
//   e.preventDefault();
// };

// const message = document.createElement("span");
// message.id = "important-msg";
// message.innerHTML = `[Select Multiple Picture At Once For the Support of this Project]`;

// content_image.append(message);

const checkEnableButton = () => {
  submitBtn.disabled = !(
    title.value &&
    story.value &&
    file_input.files[0] &&
    title.value.length <= 60 &&
    story.value.length > 0
  );
};

title.addEventListener("change", checkEnableButton);
story.addEventListener("change", checkEnableButton);
file_input.addEventListener("change", checkEnableButton);

/* Live character count for title */

function charCount(obj) {
  let maxLength = 60;
  let currLength = obj.value.length;
  document.getElementById("charnum").innerHTML = currLength + "/" + maxLength;

  if (currLength > maxLength) {
    document.getElementById(
      "charnum"
    ).innerHTML = `<span style="color: red;"> ${currLength} out of  ${maxLength}  characters</span>`;
  } else {
    document.getElementById("charnum").innerHTML = currLength + "/" + maxLength;
  }
}

/* Live character count for story */

function charDecrease(obj) {
  let maxLength = 5000;
  let currLength = obj.value.length;
  let presentLength = maxLength - currLength;
  document.getElementById("storychar").innerHTML = presentLength;

  if (presentLength < 0) {
    document.getElementById(
      "storychar"
    ).innerHTML = `<span style="color : red">${currLength} out of ${maxLength} characters</span>`;
  } else {
    document.getElementById("storychar").innerHTML = presentLength;
  }
}

/* put the images inside the container */

function preview() {
  content_image.innerHTML = "";
  for (let i of file_input.files) {
    let reader = new FileReader();
    let figure = document.createElement("figure");

    reader.onload = () => {
      let img = document.createElement("img");
      img.setAttribute("src", reader.result);
      img.className = "uploaded_img";

      figure.appendChild(img);
    };

    content_image.insertAdjacentElement("beforeend", figure);
    reader.readAsDataURL(i);
  }
}

const error_div = document.querySelectorAll("#error-btn");
for (let index = 0; index < error_div.length; index++) {
  error_div[index].addEventListener("click", function () {
    this.parentNode.remove();
  });
}
