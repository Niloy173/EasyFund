const image_input = document.getElementById("file");
const about_me = document.getElementById("about-me");
const submitBtn = document.getElementById("next");
const reader = new FileReader();

const aboutLen = about_me.value.length;
document.getElementById("highest").innerHTML = `${
  500 - aboutLen
} characters remaining`;

image_input.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    let display_image = document.querySelector("#display_img");
    reader.addEventListener("load", function () {
      display_image.setAttribute("src", reader.result);
    });

    reader.readAsDataURL(this.files[0]);
  }
});

const checkEnableButton = () => {
  // console.log(about_me.value.length);
  // console.log(aboutLen);
  submitBtn.disabled = !(
    (about_me.value && about_me.value.length < 500) ||
    image_input.files[0]
  );

  if (!submitBtn.disabled) {
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
  } else {
    submitBtn.style.opacity = "0.7";
    submitBtn.style.cursor = "no-drop";
  }
};

about_me.addEventListener("change", checkEnableButton);
image_input.addEventListener("change", checkEnableButton);

function charCount(obj) {
  const maxLength = 500;
  let currLength = maxLength - obj.value.length;

  if (currLength < 0) {
    document.getElementById("highest").innerHTML = `
    <span style="color:red;"> maximum limit reached </span>
    `;
  } else {
    document.getElementById(
      "highest"
    ).innerHTML = `${currLength} characters remaining`;

    about_me.placeholder = `write something about yourself`;
  }
}

/* event click for closing the error related div */
const error_div = document.querySelectorAll("#error-btn");
for (let index = 0; index < error_div.length; index++) {
  error_div[index].addEventListener("click", function () {
    this.parentNode.remove();
  });
}
