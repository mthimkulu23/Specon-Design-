const form = document.getElementById('registrationForm');
const messageDiv = document.getElementById('message') || createMessageDiv();
let messageTimeout;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    handleRegistration();
});

function handleRegistration() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username')?.value || generateUsername(email);
    const userType = document.getElementById('userType').value;
    const contact = document.getElementById('contact').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (!fullName || !email || !userType || !contact || !password || !confirmPassword) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    if (password.length < 10) {
        showMessage('Password must be at least 10 characters long', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    // Disable button to prevent multiple submissions
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            username: username,
            userType: userType,
            contact: contact,
            password: password,
            confirmPassword: confirmPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Registration successful! Redirecting to dashboard...', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } else {
            showMessage(data.message || 'Registration failed', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        }
    })
    .catch(error => {
        showMessage('An error occurred. Please try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
        console.error('Error:', error);
    });
}

function handleBack() {
    window.history.back();
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'message show ' + (type || '');
    
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(function() {
        messageDiv.classList.remove('show');
    }, 3000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generateUsername(email) {
    // Generate username from email (remove domain)
    return email.split('@')[0] + Math.random().toString(36).substring(7);
}

function createMessageDiv() {
    const div = document.createElement('div');
    div.id = 'message';
    div.className = 'message';
    document.body.appendChild(div);
    return div;
}

// Add real-time password validation
const passwordInput = document.getElementById('password');
if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        const requirements = document.querySelectorAll('.requirement-item');
        requirements.forEach(req => {
            if (this.value.length >= 10) {
                req.classList.add('valid');
            } else {
                req.classList.remove('valid');
            }
        });
    });
}
