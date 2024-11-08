// JavaScript to handle the countdown and redirection
document.addEventListener("DOMContentLoaded", function() {
    var countdownElement = document.getElementById("countdown");
    var countdownTime = parseInt(countdownElement.textContent);
    
    // Countdown function
    var countdownInterval = setInterval(function() {
      countdownTime--;
      countdownElement.textContent = countdownTime;
  
      // Redirect to /user/dashboard when countdown hits 0
      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        window.location.href = "/user/dashboard";
      }
    }, 1000); // Decrease the countdown every 1 second
  });
  