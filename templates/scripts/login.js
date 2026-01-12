const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');
let messageTimeout;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    handleSignIn();
});

function handleSignIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showMessage('Please enter both username and password', 'error');
        return;
    }

    // Disable button to prevent multiple submissions
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } else {
            showMessage(data.message || 'Login failed', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign in';
        }
    })
    .catch(error => {
        showMessage('An error occurred. Please try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign in';
        console.error('Error:', error);
    });
}

function handleForgot() {
    window.location.href = '/forgot-password';
}

function handleSignup() {
    window.location.href = '/register';
}

function handleBack() {
    window.location.href = '/';
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'message show ' + (type || '');
    
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(function() {
        messageDiv.classList.remove('show');
    }, 3000);
}

