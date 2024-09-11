document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous errors
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('message').textContent = '';

    // Show spinner
    document.getElementById('spinner').style.display = 'block';

    // Get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    let isValid = true;

    // Username validation
    if (!username || !validateEmail(username)) {
        document.getElementById('usernameError').textContent = 'Please enter a valid email.';
        isValid = false;
    }

    // Password validation
    if (!password || password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters.';
        isValid = false;
    }

    if (isValid) {
        // Make API request
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = 'Login successful!';
        })
        .catch(error => {
            document.getElementById('message').textContent = 'Login failed. Please try again.';
        })
        .finally(() => {
            // Hide spinner
            document.getElementById('spinner').style.display = 'none';
        });
    } else {
        // Hide spinner
        document.getElementById('spinner').style.display = 'none';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show/Hide Password
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈';
});
