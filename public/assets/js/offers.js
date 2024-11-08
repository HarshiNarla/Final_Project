    const feedbackBtn = document.getElementById('feedbackBtn');
    const feedbackOverlay = document.getElementById('feedbackOverlay');
    const closeBtn = document.getElementById('closeBtn');
    const feedbackForm = document.getElementById('feedbackForm');

    feedbackBtn.addEventListener('click', function() {
        feedbackOverlay.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function() {
        feedbackOverlay.style.display = 'none';
    });

    feedbackOverlay.addEventListener('click', function(e) {
        if (e.target === feedbackOverlay) {
            feedbackOverlay.style.display = 'none';
        }
    });

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the email value
        const email = document.getElementById('email').value;

        // Redirect to thank you page with email as a query parameter
        window.location.href = `/user/offer_thanks?email=${encodeURIComponent(email)}`;
    });