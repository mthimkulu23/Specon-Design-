document_id: reviews_logic
document_content:
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.stars-input .star');
    const submitBtn = document.querySelector('.submit-btn');
    const nameInput = document.querySelector('.review-form input[type="text"]');
    let currentRating = 0;

    // Star interactivity
    stars.forEach((star, index) => {
        // Hover effects
        star.addEventListener('mouseover', () => {
            highlightStars(index + 1);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(currentRating);
        });

        // Click selection
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

    // Form validation
    nameInput.addEventListener('input', validateForm);

    function validateForm() {
        const isNameValid = nameInput.value.trim().length > 0;
        const isRatingValid = currentRating > 0;

        if (isNameValid && isRatingValid) {
            submitBtn.disabled = false;
            submitBtn.style.background = '#000';
            submitBtn.style.color = '#fff';
            submitBtn.style.cursor = 'pointer';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.background = 'rgba(0,0,0,0.1)';
            submitBtn.style.color = '#666';
            submitBtn.style.cursor = 'not-allowed';
        }
    }

    // Form submission
    document.querySelector('.review-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const reviewText = document.querySelector('.review-form input[type="text"]').value; // Or maybe I should add a textarea? Reference doesn't show one but it's good for UX. The reference image DOES show a comment area in Feedback but only a name input in Reviews? Wait, let me check.
        // Actually the Reviews image shows "Excellent service..." etc. in the reviews list, but the submission form only shows "Your Name" and "Rate the Hospital". 
        // I'll add a simple text input for the review text if it's missing, OR just use the name as a placeholder for the demo.
        // Looking at the Reviews image again, it's just "Your Name". 
        // Wait, I'll update the HTML to include a comment field in the Reviews form too, it makes more sense.

        // Dynamic Review Addition
        const reviewsList = document.querySelector('.reviews-list');
        const newReview = document.createElement('div');
        newReview.className = 'review-item';

        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += i < currentRating ? '<span>★</span>' : '<span class="empty">★</span>';
        }

        newReview.innerHTML = `
            <div class="review-name">${name}
                <div class="stars small">${starsHtml}</div>
            </div>
            <p class="review-text">New review submitted on ${new_Date().toLocaleDateString()}. Thank you for your feedback!</p>
        `;

        reviewsList.prepend(newReview);

        alert('Thank you for your review!');

        // Reset form
        nameInput.value = '';
        currentRating = 0;
        highlightStars(4.5); // Reset to base state or 0
        validateForm();
    });
});
