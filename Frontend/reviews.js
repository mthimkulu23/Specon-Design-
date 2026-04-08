document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.stars-input .star');
    const submitBtn = document.querySelector('.submit-btn');
    const nameInput = document.querySelector('#review-name');
    const commentInput = document.querySelector('#review-comment');
    const reviewForm = document.querySelector('.review-form');
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
    commentInput.addEventListener('input', validateForm);

    function validateForm() {
        const isNameValid = nameInput.value.trim().length > 0;
        const isCommentValid = commentInput.value.trim().length > 0;
        const isRatingValid = currentRating > 0;

        if (isNameValid && isCommentValid && isRatingValid) {
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
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        // Dynamic Review Addition
        const reviewsList = document.querySelector('.reviews-list');
        const newReview = document.createElement('div');
        newReview.className = 'review-item';

        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += i < currentRating ? '<span>★</span>' : '<span class="empty">★</span>';
        }

        newReview.innerHTML = `
            <div class="review-top">
                <div class="review-name">${name}
                    <div class="stars small">${starsHtml}</div>
                </div>
                <button class="reply-btn">Reply</button>
            </div>
            <p class="review-text">${comment}</p>
        `;

        reviewsList.prepend(newReview);

        alert('Thank you for your review!');

        // Reset form
        reviewForm.reset();
        currentRating = 0;
        highlightStars(0);
        validateForm();
    });
});
