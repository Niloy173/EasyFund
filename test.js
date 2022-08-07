function preview() {
  content_image.innerHTML = "";
  content_image.style.padding = "0px";

  for (let i of file_input.files) {
    let reader = new FileReader();
    let figure = document.createElement("figure");
    let button = document.createElement("button");

    figure.className = "figure";
    button.type = "button";
    button.className = "close AClass";
    button.innerHTML = "&times;";

    reader.onload = () => {
      let img = document.createElement("img");
      img.setAttribute("src", reader.result);
      img.className = "uploaded_img";
      img.name = i.name;
      button.onclick = function (e) {
        if (confirm("Do you want to remove it")) {
          DeletedItem.push(i.name);
          this.parentNode.parentNode.removeChild(this.parentNode);
          if (content_image.childElementCount === 0) {
            content_image.innerHTML = `
      
            [Select Multiple Picture At Once For the Support of this Project]
            
            `;

            file_input.disabled = false;
            content_image.style.padding = "20px";
            content_image.style["pointer-events"] = "none";
          }
        } else {
          // nothing to do here
        }
      };
      figure.appendChild(button);
      figure.appendChild(img);
    };

    content_image.insertAdjacentElement("beforeend", figure);
    reader.readAsDataURL(i);
  }

  file_input.disabled = true;
}
