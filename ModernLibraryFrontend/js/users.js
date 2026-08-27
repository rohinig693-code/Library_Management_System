const API_URL = "https://library-management-system-sql9.onrender.com/users";


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    if (!checkAdminLogin()) {
        return;
    }

    loadUsers();
    setupUserSearch();

});


// ========================================
// CHECK ADMIN LOGIN
// ========================================

function checkAdminLogin() {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const userRole =
        localStorage.getItem("userRole");

    if (
        isLoggedIn !== "true" ||
        userRole !== "admin"
    ) {

        window.location.href = "login.html";

        return false;
    }

    return true;
}


// ========================================
// LOAD USERS
// ========================================

async function loadUsers() {

    const tableBody =
        document.getElementById("usersTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = `
        <tr>
            <td colspan="5">
                Loading users...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                "HTTP Error: " + response.status
            );
        }

        const users = await response.json();

        console.log("Users loaded:", users);

        displayUsers(users);

    } catch (error) {

        console.error("Unable to load users:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    Unable to load users
                </td>
            </tr>
        `;
    }
}


// ========================================
// DISPLAY USERS
// ========================================

function displayUsers(users) {

    const tableBody =
        document.getElementById("usersTableBody");

    if (!tableBody) {
        return;
    }

    if (!Array.isArray(users) || users.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No users found
                </td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = "";

    users.forEach(function (user) {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${user.id ?? "-"}</td>

            <td>
                ${user.username ?? user.name ?? "-"}
            </td>

            <td>
                ${user.email ?? "-"}
            </td>

            <td>
                ${user.role ?? "USER"}
            </td>

            <td>
                <span>Active</span>
            </td>
        `;

        tableBody.appendChild(row);

    });
}


// ========================================
// SEARCH USERS
// ========================================

function setupUserSearch() {

    const searchInput =
        document.getElementById("userSearchInput");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener(
        "input",
        async function () {

            const searchText =
                searchInput.value
                    .trim()
                    .toLowerCase();

            try {

                const response =
                    await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(
                        "HTTP Error: " + response.status
                    );
                }

                const users =
                    await response.json();

                if (searchText === "") {

                    displayUsers(users);

                    return;
                }

                const filteredUsers =
                    users.filter(function (user) {

                        const name =
                            String(
                                user.username ??
                                user.name ??
                                ""
                            ).toLowerCase();

                        const email =
                            String(
                                user.email ?? ""
                            ).toLowerCase();

                        const role =
                            String(
                                user.role ?? ""
                            ).toLowerCase();

                        return (
                            name.includes(searchText) ||
                            email.includes(searchText) ||
                            role.includes(searchText)
                        );

                    });

                displayUsers(filteredUsers);

            } catch (error) {

                console.error(
                    "Search error:",
                    error
                );

            }

        }
    );

}


// ========================================
// LOGOUT
// ========================================

function logout(event) {

    if (event) {
        event.preventDefault();
    }

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );

    if (!confirmLogout) {
        return;
    }

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    window.location.href = "login.html";
}