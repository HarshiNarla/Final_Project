document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const continueButton = document.querySelector('.continue-btn');

    function validateInputs() {
        const isEmailValid = emailInput.validity.valid;
        const isPasswordValid = passwordInput.value.length >= 6;

        if (isEmailValid && isPasswordValid) {
            continueButton.classList.add('active');  // Enable button
            continueButton.disabled = false;
        } else {
            continueButton.classList.remove('active');  // Disable button
            continueButton.disabled = true;
        }
    }

    // Add event listeners to input fields
    emailInput.addEventListener('input', validateInputs);
    passwordInput.addEventListener('input', validateInputs);

    // Initial call to disable the button when page is loaded
    validateInputs();
});
