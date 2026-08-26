document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const role = document.getElementById("role").value;
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        loginMessage.textContent = "";

        // =========================
        // ADMIN
        // =========================

        if (
            role === "admin" &&
            email === "admin@library.com" &&
            password === "admin123"
        ) {

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", "admin");
            localStorage.setItem("userEmail", email);

            loginMessage.textContent = "Admin login successful!";
            loginMessage.style.color = "green";

            setTimeout(function () {
                window.location.href = "admin-dashboard.html";
            }, 500);

            return;
        }


        // =========================
        // USER
        // =========================

        if (
            role === "user" &&
            email === "user@library.com" &&
            password === "user123"
        ) {

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", "user");
            localStorage.setItem("userEmail", email);

            loginMessage.textContent = "User login successful!";
            loginMessage.style.color = "green";

            setTimeout(function () {
                window.location.href = "user-dashboard.html";
            }, 500);

            return;
        }


        // =========================
        // INVALID
        // =========================

        loginMessage.textContent =
            "Invalid role, email or password.";

        loginMessage.style.color = "red";

    });

});