
function CheckEmail(obj)
{


  if(obj.value.split("@")[1] !="diu.edu.bd")
  {
   
    document.getElementById("msg").innerText = "please provide vaild email address";
    document.getElementById("msg").style.display = "block";
    document.getElementById("submit-form").style.cursor = "no-drop"
  }else{

    document.getElementById("msg").style.display = "none";
    document.getElementById("submit-form").style.cursor = "pointer"

  }

}


function CheckPassword(obj)
{
  let curr_length = obj.value.length;
  if(curr_length > 8)
  {
    document.getElementById("msg").innerText = "please provide 8 digit password";
    document.getElementById("msg").style.display = "block";
    document.getElementById("submit-form").style.cursor = "no-drop"
  }else{

   
    document.getElementById("msg").style.display = "none";
    document.getElementById("submit-form").style.cursor = "pointer"

  }
}

function ConfirmPassword(obj)
{
  let actual_pass = document.getElementById("user-pass").value;
  if(obj.value != actual_pass)
  {
    document.getElementById("msg").innerText = "password didn't match properly"
    document.getElementById("msg").style.display = "block";
    document.getElementById("submit-form").style.cursor = "no-drop";
  }else{

    
    document.getElementById("msg").style.display = "none";
    document.getElementById("submit-form").style.cursor = "pointer";
    

  }
}
