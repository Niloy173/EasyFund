function BackPressed() {
  if (sessionStorage.getItem("CurrentURL").split("/").pop() === "preview") {
    if (
      confirm(
        "Are you sure you want to leave this page? You will lost all the contents you are editing & have to start form the Begining"
      )
    ) {
      const response = fetch("/preview/back", {
        method: "GET",
      });

      window.location.href = "/general";
    } else {
      // do nothing
    }
  }
}
<<<<<<< HEAD

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   e.returnValue = `Are you sure you want to leave?`;
// });
=======
>>>>>>> b4cac55746840e171a05e4d0396284d851e5d4ff
