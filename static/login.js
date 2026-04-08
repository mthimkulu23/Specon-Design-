
const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSignIn();
});

function handleSignIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('userType').value;

    if (!username || !password) {
        showMessage('Please enter both username and password');
        return;
    }

    // Send login request to server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            role: role
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to appropriate dashboard
                window.location.href = data.redirect;
            } else {
                showMessage(data.message || 'Login failed');
            }
        })
        .catch(error => {
            showMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        });
}

function handleForgot() {
    const forgotBtn = document.querySelector('[onclick="handleForgot()"]');
    const url = forgotBtn.getAttribute('data-url');
    if (url) {
        window.location.href = url;
    }
}

function handleSignup() {
    const signupBtn = document.querySelector('.signup-link');
    const url = signupBtn.getAttribute('data-url');
    if (url) {
        window.location.href = url;
    }
}

function handleBack() {
    const backBtn = document.querySelector('.back-button');
    const url = backBtn.getAttribute('data-url');
    if (url) {
        window.location.href = url;
    } else {
        window.history.back();
    }
}


function showMessage(text) {
    messageDiv.textContent = text;
    messageDiv.classList.add('show');

    setTimeout(function () {
        messageDiv.classList.remove('show');
    }, 3000);
}
