let slides_img = document.getElementsByClassName("singleSlide");
let SLideInd = 0;
showSlide(); // for automactic image sliding

function showSlide() {
  // var dot_img = document.getElementsByClassName("dot");

  for (let i = 0; i < slides_img.length; i++) {
    slides_img[i].style.display = "none";
  }
  SLideInd += 1;
  if (SLideInd > slides_img.length) SLideInd = 1;

  // for(i=0;i<dot_img.length;i++)
  // {
  //   dot_img[i].className = dot_img[i].className.replace("active","");
  // }

  slides_img[SLideInd - 1].style.display = "block";
  // dot_img[SLideInd-1].className += " active";
  setTimeout(showSlide, 3000);
}
