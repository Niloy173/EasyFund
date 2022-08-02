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

const checkEnableButton = () => {
  submitBtn.disabled = !(
    title.value &&
    story.value &&
    title.value.length <= 60 &&
    story.value.length > 0
  );
};

title.addEventListener("change", checkEnableButton);
story.addEventListener("change", checkEnableButton);

// backpressed
function BackPressed() {
  if (sessionStorage.getItem("CurrentURL").split("/").pop() === "story") {
    if (
      confirm(
        "Are you sure you want to leave this page? You will lost all the contents you are editing & have to start form the Begining"
      )
    ) {
      const response = fetch("/story/back", {
        method: "GET",
      });

      window.location.href = "/general";
    } else {
    }
  }
}

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
  for (let i of file_input.files) {
    let reader = new FileReader();
    let figure = document.createElement("figure");

    reader.onload = () => {
      let img = document.createElement("img");
      img.setAttribute("src", reader.result);
      img.className = "uploaded_img";
      img.onclick = function () {
        if (confirm("Do you want to remove it")) {
          this.remove();
        } else {
          // nothing to do here
        }
      };
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
