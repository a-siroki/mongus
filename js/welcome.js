function getName() {
    const element = document.getElementById('userInputFname');
    if (element != null){
      Fname = element.value;
    }
    else {
      alert("Please input your first name");
    }
    const element2 = document.getElementById('userInputLname');
    if (element2 != null){
      Lname = element2.value;
    }
    else {
      alert("Please input your last name");
    }
    
    localStorage.setItem("Fname", Fname);
    localStorage.setItem("Lname", Lname);
  
    return;
  }

function nextpageOnAlert() {
    document.location.href='survey.html';
    window.alert('Sign Up Sucessfull');
    
  }