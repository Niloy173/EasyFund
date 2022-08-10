// get all the progress bar
function Calculate_percentage(TargetMoney, currMoney) {
  const targetAmount = parseInt(TargetMoney);

  const get_percentage = (currMoney / targetAmount) * 100;

  // console.log(get_percentage);

  return Math.ceil(get_percentage);
}

const all_card = document.querySelectorAll(".card-container");

for (let index = 0; index < all_card.length; index++) {
  console.log(all_card[index].children);

  // console.log(all_card[index].children[3].children[0].innerHTML);
  // console.log(all_card[index].children[4].value);
  const TargetAmount = all_card[index].children[3];

  const CurrentAmount = all_card[index].children[4];

  const actual_per = Calculate_percentage(
    TargetAmount.children[0].innerHTML.split(" ")[1],
    CurrentAmount.value
  );

  TargetAmount.children[1].innerHTML = `${actual_per}%`;
}
