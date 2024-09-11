document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const apiMessage = document.getElementById("apiMessage");
    const spinner = document.getElementById("spinner");

    let isValid = true;

    // Email validation
    if (!validateEmail(email)) {
        emailError.textContent = "Please enter a valid email.";
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Password validation
    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long.";
        passwordError.style.display = "block";
        isValid = false;
    } else {
        passwordError.style.display = "none";
    }

    // If form is valid, make API call
    if (isValid) {
        const data = { username: email, password: password };
        spinner.style.display = "block"; // Show spinner
        apiMessage.textContent = ""; // Clear previous messages

        // Remember me functionality
        const rememberMe = document.getElementById("rememberMe").checked;
        if (rememberMe) {
            localStorage.setItem("username", email); // Store username in local storage
        } else {
            localStorage.removeItem("username");
        }

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                spinner.style.display = "none"; // Hide spinner
                apiMessage.textContent = "Login successful!";
                apiMessage.style.color = "green";
            })
            .catch(() => {
                spinner.style.display = "none"; // Hide spinner
                apiMessage.textContent = "Login failed. Please try again.";
                apiMessage.style.color = "red";
            });
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Show/Hide password functionality
document.getElementById("showPassword").addEventListener("change", function () {
    const passwordField = document.getElementById("password");
    if (this.checked) {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
});

// Populate remembered username
window.addEventListener("load", function () {
    const rememberedUsername = localStorage.getItem("username");
    if (rememberedUsername) {
        document.getElementById("username").value = rememberedUsername;
        document.getElementById("rememberMe").checked = true;
    }
});
