document
    .getElementById("registrationForm")
    .addEventListener("submit", function(e) {
        e.preventDefault();

        // Clear previous error messages
        clearErrors();

        let isValid = true;

        // Validate Name
        const name = document.getElementById("name").value.trim();
        if (name === "" || name.length < 3) {
            showError("nameError", "Name must be at least 3 characters long.");
            isValid = false;
        }

        // Validate Email
        const email = document.getElementById("email").value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("emailError", "Please enter a valid email address.");
            isValid = false;
        }

        // Validate Password
        const password = document.getElementById("password").value.trim();
        if (password.length < 6) {
            showError(
                "passwordError",
                "Password must be at least 6 characters long."
            );
            isValid = false;
        }

        if (isValid) {
            alert("Registration successful!");
            document.getElementById("registrationForm").reset();
        }
    });

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

function clearErrors() {
    document.querySelectorAll(".error").forEach((errorElement) => {
        errorElement.textContent = "";
        errorElement.style.display = "none";
    });
}