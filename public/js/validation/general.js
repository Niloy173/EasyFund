const category_box = document.querySelector("input#category_box");
const dropdown_content = document.getElementById("myDropdown");
const amount = document.querySelector("input#amount");
const deadline = document.querySelector('input[type="date"]');
const list = document.querySelector("#li");
const form = document.getElementById("generalForm");
const submitBtn = document.getElementById("next");

function fixDate() {
  let dateobj = new Date();
  let CurrDate = dateobj.getDate() + 1;
  let currMonth = dateobj.getMonth() + 2;
  let currYear = dateobj.getUTCFullYear();

  if (CurrDate < 10) {
    CurrDate = "0" + CurrDate;
  }

  if (currMonth < 10) {
    currMonth = "0" + currMonth;
  }

  let min = currYear + "-" + currMonth + "-" + CurrDate;
  let max = currYear + 1 + "-" + currMonth + "-" + CurrDate;

  //console.log(Today);

  deadline.setAttribute("min", min);
  deadline.setAttribute("max", max);
}

const checkEnableButton = () => {
  submitBtn.disabled = !(
    amount.value &&
    deadline.value &&
    list.value !== "Choose your category"
  );
};

amount.addEventListener("change", checkEnableButton);
deadline.addEventListener("change", checkEnableButton);
list.addEventListener("change", checkEnableButton);

/* event click for closing the error related div */
const error_div = document.querySelectorAll("#error-btn");
for (let index = 0; index < error_div.length; index++) {
  error_div[index].addEventListener("click", function () {
    this.parentNode.remove();
  });
}
