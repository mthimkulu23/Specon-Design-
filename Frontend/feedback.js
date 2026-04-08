document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.stars-input .star');
    const submitBtn = document.querySelector('.submit-btn');
    const textarea = document.querySelector('.feedback-form textarea');
    let currentRating = 0;

    // Star interactivity
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => highlightStars(index + 1));
        star.addEventListener('mouseout', () => highlightStars(currentRating));
        star.addEventListener('click', () => {
            currentRating = index + 1;
            highlightStars(currentRating);
            validateForm();
        });
    });

    function highlightStars(count) {
        stars.forEach((star, index) => {
            if (index < count) {
                star.textContent = '★';
                star.classList.add('selected');
            } else {
                star.textContent = '☆';
                star.classList.remove('selected');
            }
        });
    }

    // Form logic
    textarea.addEventListener('input', validateForm);

    function validateForm() {
        // Enable if rating is provided (comment is optional as per image, but let's say at least rating)
        if (currentRating > 0) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    document.querySelector('.feedback-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your valuable feedback!');
        location.reload();
    });
});
