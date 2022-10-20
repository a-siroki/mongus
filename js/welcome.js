function getName() {
    const element = document.getElementById('userInputFname');
    if (element != null){
      Fname = element.value;
    }
    
    if(Fname == "") {
      window.alert("Please input your first name");
    }
    
    const element2 = document.getElementById('userInputLname');
    if (element2 != null){
      Lname = element2.value;
    }

    if(Lname == "") {
      window.alert("Please input your last name");
    }
    
    localStorage.setItem("Fname", Fname);
    localStorage.setItem("Lname", Lname);
  
    return;
  }

function nextpageOnAlert() {
  if(Fname && Lname != " ") {
    window.alert('Sign Up Sucessfull');  
    window.location.href = "survey.html";
  } 
}