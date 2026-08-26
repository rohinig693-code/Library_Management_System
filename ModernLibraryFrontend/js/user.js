const API_URL = "http://localhost:8080/books";
const USER_API = "http://localhost:8080/users";
const BORROW_API = "http://localhost:8080/borrow";


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    checkUserLogin();

    loadUserBooks();

    loadMyBooks();

    setupSearch();

    showDashboardHome();

});


// ========================================
// CHECK USER LOGIN
// ========================================

function checkUserLogin() {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const userRole =
        localStorage.getItem("userRole");

    const userEmail =
        localStorage.getItem("userEmail");


    if (
        isLoggedIn !== "true" ||
        userRole !== "user"
    ) {

        window.location.href = "login.html";

        return;

    }


    const emailElement =
        document.getElementById("userEmail");


    if (emailElement) {

        emailElement.textContent =
            userEmail || "user@library.com";

    }

}


// ========================================
// SHOW ONLY ONE SECTION
// ========================================

function showSection(sectionId) {

    const sections = [

        "dashboardSection",
        "availableBooksSection",
        "myBooksSection",
        "searchBooksSection"

    ];


    sections.forEach(function (id) {

        const section =
            document.getElementById(id);

        if (section) {

            section.style.display = "none";

        }

    });


    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.style.display = "block";

    }

}


// ========================================
// DASHBOARD HOME
// ========================================

function showDashboardHome() {

    showSection("dashboardSection");

    setPageTitle(
        "Dashboard",
        "Welcome back, User 👋"
    );

}


// ========================================
// PAGE TITLE
// ========================================

function setPageTitle(title, subtitle) {

    const pageTitle =
        document.getElementById("pageTitle");

    const pageSubtitle =
        document.getElementById("pageSubtitle");


    if (pageTitle) {

        pageTitle.textContent = title;

    }


    if (pageSubtitle) {

        pageSubtitle.textContent = subtitle;

    }

}


// ========================================
// LOAD BOOKS
// ========================================

async function loadUserBooks() {

    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to fetch books"
            );

        }


        const books =
            await response.json();


        displayUserBooks(books);

        displayDashboardBooks(books);

        updateUserStatistics(books);

    }

    catch (error) {

        console.error(
            "Unable to load books:",
            error
        );


        const tableBodies = [

            "userBooksTableBody",
            "dashboardBooksTableBody",
            "searchBooksTableBody"

        ];


        tableBodies.forEach(function (id) {

            const tableBody =
                document.getElementById(id);


            if (tableBody) {

                tableBody.innerHTML = `
                    <tr>
                        <td colspan="7">
                            Unable to load books
                        </td>
                    </tr>
                `;

            }

        });

    }

}


// ========================================
// DISPLAY AVAILABLE BOOKS
// ========================================

function displayUserBooks(books) {

    const tableBody =
        document.getElementById(
            "userBooksTableBody"
        );


    if (!tableBody) {

        return;

    }


    if (!books || books.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No books available
                </td>
            </tr>
        `;

        return;

    }


    tableBody.innerHTML = "";


    books.forEach(function (book) {

        const row =
            document.createElement("tr");


        const available =
            Number(
                book.availableQuantity || 0
            );


        let actionButton;


        if (available > 0) {

            actionButton = `
                <button
                    class="action-button"
                    onclick="borrowBook(${book.id})"
                >
                    Borrow
                </button>
            `;

        }

        else {

            actionButton = `
                <span>
                    Not Available
                </span>
            `;

        }


        row.innerHTML = `

            <td>${book.id}</td>

            <td>${book.title || "-"}</td>

            <td>${book.author || "-"}</td>

            <td>${book.category || "-"}</td>

            <td>${book.isbn || "-"}</td>

            <td>${available}</td>

            <td>
                ${actionButton}
            </td>

        `;


        tableBody.appendChild(row);

    });

}


// ========================================
// DASHBOARD BOOK PREVIEW
// ========================================

function displayDashboardBooks(books) {

    const tableBody =
        document.getElementById(
            "dashboardBooksTableBody"
        );


    if (!tableBody) {

        return;

    }


    if (!books || books.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No books available
                </td>
            </tr>
        `;

        return;

    }


    tableBody.innerHTML = "";


    books
        .filter(function (book) {

            return Number(
                book.availableQuantity || 0
            ) > 0;

        })
        .slice(0, 5)
        .forEach(function (book) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${book.id}</td>

                <td>${book.title || "-"}</td>

                <td>${book.author || "-"}</td>

                <td>${book.category || "-"}</td>

                <td>
                    ${Number(
                        book.availableQuantity || 0
                    )}
                </td>

                <td>

                    <button
                        class="action-button"
                        onclick="borrowBook(${book.id})"
                    >
                        Borrow
                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });


    if (tableBody.innerHTML === "") {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No books currently available
                </td>
            </tr>
        `;

    }

}


// ========================================
// STATISTICS
// ========================================

function updateUserStatistics(books) {

    const totalBooks =
        books.reduce(
            function (total, book) {

                return total +
                    Number(book.quantity || 0);

            },
            0
        );


    const availableBooks =
        books.reduce(
            function (total, book) {

                return total +
                    Number(
                        book.availableQuantity || 0
                    );

            },
            0
        );


    const totalBooksElement =
        document.getElementById(
            "userTotalBooks"
        );


    const availableBooksElement =
        document.getElementById(
            "userAvailableBooks"
        );


    if (totalBooksElement) {

        totalBooksElement.textContent =
            totalBooks;

    }


    if (availableBooksElement) {

        availableBooksElement.textContent =
            availableBooks;

    }

}


// ========================================
// SIDEBAR - DASHBOARD
// ========================================

function showUserDashboard(
    event,
    element
) {

    event.preventDefault();

    setActiveMenu(element);

    showDashboardHome();

}


// ========================================
// SIDEBAR - AVAILABLE BOOKS
// ========================================

function showAvailableBooks(
    event,
    element
) {

    event.preventDefault();

    setActiveMenu(element);

    showSection(
        "availableBooksSection"
    );


    setPageTitle(
        "Available Books",
        "Browse books available for borrowing"
    );


    loadUserBooks();

}


// ========================================
// SIDEBAR - MY BOOKS
// ========================================

function showMyBooks(
    event,
    element
) {

    event.preventDefault();

    setActiveMenu(element);

    showSection(
        "myBooksSection"
    );


    setPageTitle(
        "My Books",
        "Books borrowed by you"
    );


    loadMyBooks();

}


// ========================================
// SIDEBAR - SEARCH BOOKS
// ========================================

function showSearchBooks(
    event,
    element
) {

    event.preventDefault();

    setActiveMenu(element);

    showSection(
        "searchBooksSection"
    );


    setPageTitle(
        "Search Books",
        "Find books in the library"
    );


    const input =
        document.getElementById(
            "userSearchInput"
        );


    if (input) {

        input.focus();

    }

}


// ========================================
// QUICK ACTION - BROWSE BOOKS
// ========================================

function openAvailableBooks() {

    setActiveMenuByText(
        "Available Books"
    );


    showSection(
        "availableBooksSection"
    );


    setPageTitle(
        "Available Books",
        "Browse books available for borrowing"
    );


    loadUserBooks();

}


// ========================================
// QUICK ACTION - SEARCH BOOKS
// ========================================

function openSearchBooks() {

    setActiveMenuByText(
        "Search Books"
    );


    showSection(
        "searchBooksSection"
    );


    setPageTitle(
        "Search Books",
        "Find books in the library"
    );


    const input =
        document.getElementById(
            "userSearchInput"
        );


    if (input) {

        input.focus();

    }

}


// ========================================
// QUICK ACTION - MY BOOKS
// ========================================

function openMyBooks() {

    setActiveMenuByText(
        "My Books"
    );


    showSection(
        "myBooksSection"
    );


    setPageTitle(
        "My Books",
        "Books borrowed by you"
    );


    loadMyBooks();

}


// ========================================
// ACTIVE MENU
// ========================================

function setActiveMenu(element) {

    const menuItems =
        document.querySelectorAll(
            ".sidebar .menu-item"
        );


    menuItems.forEach(function (item) {

        item.classList.remove("active");

    });


    if (element) {

        element.classList.add("active");

    }

}


// ========================================
// ACTIVE MENU BY TEXT
// ========================================

function setActiveMenuByText(text) {

    const menuItems =
        document.querySelectorAll(
            ".sidebar .menu-item"
        );


    menuItems.forEach(function (item) {

        item.classList.remove("active");


        const span =
            item.querySelector("span");


        if (
            span &&
            span.textContent.trim() === text
        ) {

            item.classList.add("active");

        }

    });

}


// ========================================
// SEARCH BOOKS
// ========================================

function setupSearch() {

    const searchInput =
        document.getElementById(
            "userSearchInput"
        );


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
                        "Failed to fetch books"
                    );

                }


                const books =
                    await response.json();


                const filteredBooks =
                    books.filter(
                        function (book) {

                            return (

                                String(
                                    book.title || ""
                                )
                                .toLowerCase()
                                .includes(searchText)

                                ||

                                String(
                                    book.author || ""
                                )
                                .toLowerCase()
                                .includes(searchText)

                                ||

                                String(
                                    book.category || ""
                                )
                                .toLowerCase()
                                .includes(searchText)

                                ||

                                String(
                                    book.isbn || ""
                                )
                                .toLowerCase()
                                .includes(searchText)

                            );

                        }
                    );


                displaySearchResults(
                    filteredBooks
                );

            }

            catch (error) {

                console.error(
                    "Search error:",
                    error
                );

            }

        }
    );

}


// ========================================
// DISPLAY SEARCH RESULTS
// ========================================

function displaySearchResults(books) {

    const tableBody =
        document.getElementById(
            "searchBooksTableBody"
        );


    if (!tableBody) {

        return;

    }


    if (!books || books.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No books found
                </td>
            </tr>
        `;

        return;

    }


    tableBody.innerHTML = "";


    books.forEach(function (book) {

        const available =
            Number(
                book.availableQuantity || 0
            );


        let actionButton;


        if (available > 0) {

            actionButton = `
                <button
                    class="action-button"
                    onclick="borrowBook(${book.id})"
                >
                    Borrow
                </button>
            `;

        }

        else {

            actionButton = `
                <span>
                    Not Available
                </span>
            `;

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${book.id}</td>

            <td>${book.title || "-"}</td>

            <td>${book.author || "-"}</td>

            <td>${book.category || "-"}</td>

            <td>${book.isbn || "-"}</td>

            <td>${available}</td>

            <td>
                ${actionButton}
            </td>

        `;


        tableBody.appendChild(row);

    });

}


// ========================================
// LOAD MY BOOKS
// ========================================

async function loadMyBooks() {

    const tableBody =
        document.getElementById(
            "myBooksTableBody"
        );


    if (!tableBody) {

        return;

    }


    const userEmail =
        localStorage.getItem("userEmail");


    if (!userEmail) {

        return;

    }


    try {

        // GET USERS
        const userResponse =
            await fetch(USER_API);


        if (!userResponse.ok) {

            throw new Error(
                "Unable to load users"
            );

        }


        const users =
            await userResponse.json();


        const currentUser =
            users.find(function (user) {

                return user.email === userEmail;

            });


        if (!currentUser) {

            throw new Error(
                "Logged-in user not found"
            );

        }


        // GET BORROWED BOOKS
        const response =
            await fetch(
                `${BORROW_API}/user/${currentUser.id}`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load my books"
            );

        }


        const borrows =
            await response.json();


        if (
            !borrows ||
            borrows.length === 0
        ) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6">
                        You have not borrowed any books yet.
                    </td>
                </tr>
            `;


            const countElement =
                document.getElementById(
                    "myBooksCount"
                );


            if (countElement) {

                countElement.textContent = "0";

            }


            return;

        }


        tableBody.innerHTML = "";


        borrows.forEach(function (borrow) {

            const row =
                document.createElement("tr");


            const book =
                borrow.book;


            row.innerHTML = `

                <td>
                    ${book ? book.id : "-"}
                </td>

                <td>
                    ${book ? book.title : "-"}
                </td>

                <td>
                    ${book ? book.author : "-"}
                </td>

                <td>
                    ${borrow.borrowedDate || "-"}
                </td>

                <td>
                    ${borrow.status || "BORROWED"}
                </td>

                <td>

                    <button
                        class="action-button"
                        onclick="returnBook(${borrow.id})"
                    >
                        Return
                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });


        const countElement =
            document.getElementById(
                "myBooksCount"
            );


        if (countElement) {

            countElement.textContent =
                borrows.length;

        }

    }

    catch (error) {

        console.error(
            "My books error:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    Unable to load your borrowed books.
                </td>
            </tr>
        `;

    }

}


// ========================================
// BORROW BOOK
// ========================================

async function borrowBook(bookId) {

    const confirmBorrow =
        confirm(
            "Do you want to borrow this book?"
        );


    if (!confirmBorrow) {

        return;

    }


    const userEmail =
        localStorage.getItem("userEmail");


    if (!userEmail) {

        alert("User login information not found.");

        return;

    }


    try {

        // GET USERS
        const userResponse =
            await fetch(USER_API);


        if (!userResponse.ok) {

            throw new Error(
                "Unable to load users"
            );

        }


        const users =
            await userResponse.json();


        const currentUser =
            users.find(function (user) {

                return user.email === userEmail;

            });


        if (!currentUser) {

            alert("User not found.");

            return;

        }


        // BORROW BOOK
        const response =
            await fetch(
                `${BORROW_API}/${currentUser.id}/${bookId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();


            throw new Error(
                errorText ||
                "Unable to borrow book"
            );

        }


        alert(
            "Book borrowed successfully! 📚"
        );


        // REFRESH EVERYTHING
        await loadUserBooks();

        await loadMyBooks();

    }

    catch (error) {

        console.error(
            "Borrow error:",
            error
        );


        alert(
            error.message ||
            "Unable to borrow book."
        );

    }

}


// ========================================
// RETURN BOOK
// ========================================

async function returnBook(borrowId) {

    const confirmReturn =
        confirm(
            "Do you want to return this book?"
        );


    if (!confirmReturn) {

        return;

    }


    try {

        const response =
            await fetch(
                `${BORROW_API}/return/${borrowId}`,
                {
                    method: "PUT"
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();


            throw new Error(
                errorText ||
                "Unable to return book"
            );

        }


        alert(
            "Book returned successfully! ✅"
        );


        await loadUserBooks();

        await loadMyBooks();

    }

    catch (error) {

        console.error(
            "Return error:",
            error
        );


        alert(
            error.message ||
            "Unable to return book."
        );

    }

}


// ========================================
// LOGOUT
// ========================================

function logout(event) {

    event.preventDefault();


    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {

        return;

    }


    localStorage.removeItem(
        "isLoggedIn"
    );

    localStorage.removeItem(
        "userRole"
    );

    localStorage.removeItem(
        "userEmail"
    );


    window.location.href =
        "login.html";

}