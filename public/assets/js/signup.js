// const signupForm = document.getElementById('signupForm');
// const termsCheckbox = document.getElementById('termsCheckbox');
// const errorMessage = document.getElementById('errorMessage');

// signupForm.addEventListener('submit', function(event) {
//     // Prevent form submission if the checkbox is not checked
//     if (!termsCheckbox.checked) {
//         event.preventDefault(); 
//         errorMessage.style.display = 'block'; 
//     } 
//     else
//     {
//         errorMessage.style.display = 'none'; 
//     }
// });
const signupForm = document.getElementById('signupForm');
const termsCheckbox = document.getElementById('termsCheckbox');
const errorMessage = document.getElementById('errorMessage');
const passwordInput = document.getElementById('signupPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

signupForm.addEventListener('submit', function(event) {
    // Check if the password and confirm password match
    if (passwordInput.value !== confirmPasswordInput.value) {
        event.preventDefault(); // Prevent form submission
        alert('Passwords do not match!'); // Alert the user
        return; // Exit the function
    }

    // Prevent form submission if the checkbox is not checked
    if (!termsCheckbox.checked) {
        event.preventDefault(); 
        errorMessage.style.display = 'block'; 
    } else {
        errorMessage.style.display = 'none'; 
    }
});

// Hide the error message when the checkbox is checked or the password fields are focused
termsCheckbox.addEventListener('change', function() {
    if (termsCheckbox.checked) {
        errorMessage.style.display = 'none';
    }
});

// Optional: Hide the error message when focusing on the password fields
passwordInput.addEventListener('focus', function() {
    errorMessage.style.display = 'none';
});

confirmPasswordInput.addEventListener('focus', function() {
    errorMessage.style.display = 'none';
});