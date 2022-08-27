// get all the progress bar
function Calculate_percentage(TargetMoney, currMoney) {
  const targetAmount = parseInt(TargetMoney);

  const get_percentage = (currMoney / targetAmount) * 100;

  // console.log(get_percentage);

  return Math.ceil(get_percentage);
}

const all_card = document.querySelectorAll(".card-container");

for (let index = 0; index < all_card.length; index++) {
  let TargetAmount = 0,
    CurrentAmount = 0;

  if (all_card[index].children.length === 6) {
    /* when there is a token (success, failure, funded) exits, another
    property added as child element otherwise it's as usual */
    TargetAmount = all_card[index].children[4];
    CurrentAmount = all_card[index].children[5];
  } else {
    TargetAmount = all_card[index].children[3];
    CurrentAmount = all_card[index].children[4];
  }

  // console.log(TargetAmount.children[0].innerHTML.split(" ")[1]);
  // console.log(CurrentAmount.value);

  const actual_per = Calculate_percentage(
    TargetAmount.children[0].innerHTML.split(" ")[1],
    CurrentAmount.value
  );

  TargetAmount.children[1].innerHTML = `${actual_per}%`;
}
