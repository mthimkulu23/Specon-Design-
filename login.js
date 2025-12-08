
        const form = document.getElementById('loginForm');
        const messageDiv = document.getElementById('message');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignIn();
        });

        function handleSignIn() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                showMessage('Please enter both username and password');
                return;
            }

            showMessage(`Welcome, ${username}!`);
            // In a real app, this would authenticate with a backend
        }

        function handleForgot() {
            showMessage('Password reset link would be sent to your email');
        }

        function handleSignup() {
            showMessage('Redirecting to signup page...');
        }

        function handleBack() {
            showMessage('Going back...');
        }

        function showMessage(text) {
            messageDiv.textContent = text;
            messageDiv.classList.add('show');
            
            setTimeout(function() {
                messageDiv.classList.remove('show');
            }, 3000);
        }