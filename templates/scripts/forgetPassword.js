
        var form = document.getElementById('passwordForm');
        var messageDiv = document.getElementById('message');
        var newPasswordInput = document.getElementById('newPassword');
        var confirmPasswordInput = document.getElementById('confirmPassword');

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

            showMessage('Password successfully changed!', 'success');
            
            setTimeout(function() {
                newPasswordInput.value = '';
                confirmPasswordInput.value = '';
            }, 2000);
        }

        function handleBack() {
            showMessage('Going back...', 'success');
        }

        function showMessage(text, type) {
            messageDiv.textContent = text;
            messageDiv.className = 'message show ' + type;
            
            setTimeout(function() {
                messageDiv.classList.remove('show');
            }, 3000);
        }
