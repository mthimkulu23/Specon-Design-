var form = document.getElementById('passwordForm');
var messageDiv = document.getElementById('message');
var newPasswordInput = document.getElementById('newPassword');
var confirmPasswordInput = document.getElementById('confirmPassword');
var messageTimeout;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    handlePasswordReset();
});

function handlePasswordReset() {
    var newPassword = newPasswordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (!newPassword || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    if (newPassword.length < 10) {
        showMessage('Password must be at least 10 characters long', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    // Disable button to prevent multiple submissions
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Resetting...';

    fetch('/api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newPassword: newPassword,
            confirmPassword: confirmPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Password successfully changed!', 'success');
            setTimeout(function() {
                newPasswordInput.value = '';
                confirmPasswordInput.value = '';
                window.location.href = '/login';
            }, 2000);
        } else {
            showMessage(data.message || 'Password reset failed', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Reset Password';
        }
    })
    .catch(error => {
        showMessage('An error occurred. Please try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Reset Password';
        console.error('Error:', error);
    });
}

function handleBack() {
    window.location.href = '/login';
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'message show ' + (type || '');
    
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(function() {
        messageDiv.classList.remove('show');
    }, 3000);
}
