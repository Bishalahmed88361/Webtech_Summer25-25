let failedAttempts = 0;
let lockedUntil = 0;
let lockDuration = 5 * 60 * 1000;

function showMessage(text, type) {
    let message = document.getElementById("message");

    message.innerHTML = text;
    message.className = "message " + type;
}


function validateLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let loginButton = document.getElementById("loginButton");

    if (Date.now() < lockedUntil) {
        showMessage("Login is locked. Wait for 5 minutes.", "error");
        console.log("Login is locked. Wait for 5 minutes.");
        return false;
    }

    if (username == "" || password == "") {
        showMessage("Username and password cannot be empty.", "error");
        console.log("username or password cannot be empty.");
        return false;
    }

    if (username == "AIUB" && password == "$_student") {
        failedAttempts = 0;
        showMessage("Successfully Logged In", "success");
        document.getElementById("loginForm").reset();
        return false;
    }

    failedAttempts++



    if (failedAttempts == 1) {
        showMessage("You have 3 attempts left.", "error");
    } 
    else if (failedAttempts == 2) {
        showMessage("You have 2 attempts left.", "error");
    } 
    else if(failedAttempts == 3){
        showMessage("You have 1 attempt left. You are locked for 5 minutes.", "error");
        lockedUntil = Date.now() + lockDuration;
        loginButton.disabled = true;
        window.setTimeout(unlockLogin, lockDuration);
    }

    //sys_date, sys_value, sys.date, sys.time, sys.date.now() NOT WORKING.  

    return false;
    
}
