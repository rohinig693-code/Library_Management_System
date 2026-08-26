const API_URL = "http://localhost:8080/books";


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Only run dashboard functions if elements exist
    if (document.getElementById("booksTableBody")) {

        checkAdminLogin();

        loadBooks();

        setupSearch();

        setupAddBookForm();

        setupEditBookForm();
    }

});


// ========================================
// CHECK ADMIN LOGIN
// ========================================

function checkAdminLogin() {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const userRole =
        localStorage.getItem("userRole");


    console.log("Login:", isLoggedIn);
    console.log("Role:", userRole);


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
// SETUP ADD BOOK FORM
// ========================================

function setupAddBookForm() {

    const form =
        document.getElementById("addBookForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        addBook
    );
}


// ========================================
// SETUP EDIT BOOK FORM
// ========================================

function setupEditBookForm() {

    const form =
        document.getElementById("editBookForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        updateBook
    );
}


// ========================================
// SETUP SEARCH
// ========================================

function setupSearch() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        searchBooks
    );
}


// ========================================
// LOAD BOOKS
// ========================================

async function loadBooks() {

    const tableBody =
        document.getElementById(
            "booksTableBody"
        );


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


        displayBooks(books);

        updateStatistics(books);

    }


    catch (error) {

        console.error(
            "Load books error:",
            error
        );


        if (tableBody) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="8">
                        Unable to load books
                    </td>
                </tr>
            `;

        }

    }

}


// ========================================
// DISPLAY BOOKS
// ========================================

function displayBooks(books) {

    const tableBody =
        document.getElementById(
            "booksTableBody"
        );


    if (!tableBody) {
        return;
    }


    if (!books || books.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No books found
                </td>
            </tr>
        `;

        return;
    }


    tableBody.innerHTML = "";


    books.forEach(function (book) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${book.id}</td>

            <td>${book.title || "-"}</td>

            <td>${book.author || "-"}</td>

            <td>${book.category || "-"}</td>

            <td>${book.isbn || "-"}</td>

            <td>${book.quantity || 0}</td>

            <td>${book.availableQuantity || 0}</td>

            <td>

                <button
                    class="action-button edit-button"
                    onclick="editBook(${book.id})"
                    title="Edit Book">

                    ✏️

                </button>


                <button
                    class="action-button delete-button"
                    onclick="deleteBook(${book.id})"
                    title="Delete Book">

                    🗑️

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// ========================================
// STATISTICS
// ========================================

function updateStatistics(books) {

    const totalBooks =
        books.reduce(function (total, book) {

            return total +
                Number(book.quantity || 0);

        }, 0);


    const availableBooks =
        books.reduce(function (total, book) {

            return total +
                Number(book.availableQuantity || 0);

        }, 0);


    const issuedBooks =
        totalBooks - availableBooks;


    const totalBooksElement =
        document.getElementById("totalBooks");


    const availableBooksElement =
        document.getElementById(
            "availableBooks"
        );


    const issuedBooksElement =
        document.getElementById(
            "issuedBooks"
        );


    const totalUsersElement =
        document.getElementById(
            "totalUsers"
        );


    if (totalBooksElement) {

        totalBooksElement.textContent =
            totalBooks;

    }


    if (availableBooksElement) {

        availableBooksElement.textContent =
            availableBooks;

    }


    if (issuedBooksElement) {

        issuedBooksElement.textContent =
            issuedBooks;

    }


    if (totalUsersElement) {

        totalUsersElement.textContent =
            "0";

    }

}


// ========================================
// SEARCH BOOKS
// ========================================

async function searchBooks() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {
        return;
    }


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


        if (searchText === "") {

            displayBooks(books);

            return;

        }


        const filteredBooks =
            books.filter(function (book) {

                const title =
                    String(
                        book.title || ""
                    ).toLowerCase();


                const author =
                    String(
                        book.author || ""
                    ).toLowerCase();


                const category =
                    String(
                        book.category || ""
                    ).toLowerCase();


                const isbn =
                    String(
                        book.isbn || ""
                    ).toLowerCase();


                return (
                    title.includes(searchText) ||
                    author.includes(searchText) ||
                    category.includes(searchText) ||
                    isbn.includes(searchText)
                );

            });


        displayBooks(filteredBooks);

    }


    catch (error) {

        console.error(
            "Search error:",
            error
        );

    }

}


// ========================================
// ADD BOOK
// ========================================

async function addBook(event) {

    event.preventDefault();


    const title =
        document.getElementById(
            "bookTitle"
        ).value.trim();


    const author =
        document.getElementById(
            "bookAuthor"
        ).value.trim();


    const category =
        document.getElementById(
            "bookCategory"
        ).value.trim();


    const isbn =
        document.getElementById(
            "bookIsbn"
        ).value.trim();


    const quantity =
        Number(
            document.getElementById(
                "bookQuantity"
            ).value
        );


    const book = {

        title: title,

        author: author,

        category: category,

        isbn: isbn,

        quantity: quantity,

        availableQuantity: quantity

    };


    try {

        const response =
            await fetch(
                API_URL,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(book)

                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to add book"
            );

        }


        alert(
            "Book added successfully!"
        );


        closeAddBookModal();


        loadBooks();

    }


    catch (error) {

        console.error(
            "Add book error:",
            error
        );


        alert(
            "Unable to add book"
        );

    }

}


// ========================================
// EDIT BOOK
// ========================================

async function editBook(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Book not found"
            );

        }


        const book =
            await response.json();


        document.getElementById(
            "editBookId"
        ).value = book.id;


        document.getElementById(
            "editBookTitle"
        ).value = book.title;


        document.getElementById(
            "editBookAuthor"
        ).value = book.author;


        document.getElementById(
            "editBookCategory"
        ).value = book.category;


        document.getElementById(
            "editBookIsbn"
        ).value = book.isbn;


        document.getElementById(
            "editBookQuantity"
        ).value = book.quantity;


        document.getElementById(
            "editBookModal"
        ).style.display = "flex";

    }


    catch (error) {

        console.error(
            "Edit error:",
            error
        );


        alert(
            "Unable to load book"
        );

    }

}


// ========================================
// UPDATE BOOK
// ========================================

async function updateBook(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "editBookId"
        ).value;


    const book = {

        title:
            document.getElementById(
                "editBookTitle"
            ).value.trim(),

        author:
            document.getElementById(
                "editBookAuthor"
            ).value.trim(),

        category:
            document.getElementById(
                "editBookCategory"
            ).value.trim(),

        isbn:
            document.getElementById(
                "editBookIsbn"
            ).value.trim(),

        quantity:
            Number(
                document.getElementById(
                    "editBookQuantity"
                ).value
            ),

        availableQuantity:
            Number(
                document.getElementById(
                    "editBookQuantity"
                ).value
            )

    };


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(book)

                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to update book"
            );

        }


        alert(
            "Book updated successfully!"
        );


        closeEditBookModal();


        loadBooks();

    }


    catch (error) {

        console.error(
            "Update error:",
            error
        );


        alert(
            "Unable to update book"
        );

    }

}


// ========================================
// DELETE BOOK
// ========================================

async function deleteBook(id) {

    if (
        !confirm(
            "Are you sure you want to delete this book?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete book"
            );

        }


        alert(
            "Book deleted successfully!"
        );


        loadBooks();

    }


    catch (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            "Unable to delete book"
        );

    }

}


// ========================================
// ADD MODAL
// ========================================

function openAddBookModal() {

    const modal =
        document.getElementById(
            "addBookModal"
        );


    if (modal) {

        modal.style.display = "flex";

    }

}


// ========================================
// CLOSE ADD MODAL
// ========================================

function closeAddBookModal() {

    const modal =
        document.getElementById(
            "addBookModal"
        );


    if (modal) {

        modal.style.display = "none";

    }


    const form =
        document.getElementById(
            "addBookForm"
        );


    if (form) {

        form.reset();

    }

}


// ========================================
// CLOSE EDIT MODAL
// ========================================

function closeEditBookModal() {

    const modal =
        document.getElementById(
            "editBookModal"
        );


    if (modal) {

        modal.style.display = "none";

    }

}


// ========================================
// SIDEBAR
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
// DASHBOARD
// ========================================

function showDashboard(event, element) {

    event.preventDefault();

    setActiveMenu(element);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// MANAGE BOOKS
// ========================================

function showBooks(event, element) {

    event.preventDefault();

    setActiveMenu(element);


    const section =
        document.getElementById(
            "libraryCollection"
        );


    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// ========================================
// SEARCH BOOKS SIDEBAR
// ========================================

function focusSearch(event, element) {

    event.preventDefault();

    setActiveMenu(element);


    const section =
        document.getElementById(
            "libraryCollection"
        );


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    setTimeout(function () {

        if (searchInput) {

            searchInput.focus();

        }

    }, 500);

}


// ========================================
// LOGOUT
// ========================================

function logout(event) {

    event.preventDefault();


    if (
        !confirm(
            "Are you sure you want to logout?"
        )
    ) {

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