# 📚 Library Management System

**Modern Full Stack Library Management System**  
Built with **Spring Boot, MySQL, HTML, CSS, and Vanilla JavaScript**

A full-stack Library Management System designed to manage books, users, and library operations through a modern and responsive web interface.

The project includes role-based Admin and User dashboards, authentication, book CRUD operations, search functionality, REST API integration, MySQL database connectivity, and cloud deployment.

---

# 🚀 Live Demo

## 🌐 Frontend Application

👉 **https://library-management-frontend-9rjb.onrender.com/**

Use this link to open the Library Management System.

## ⚙️ Backend API

👉 **https://library-management-system-sql9.onrender.com/**

## 📚 Books API

👉 **https://library-management-system-sql9.onrender.com/books**

---

# 📌 Project Overview

The Library Management System provides separate functionality for **Administrators** and **Users**.

### Admin can:

- Login securely
- View dashboard statistics
- View all books
- Add new books
- Edit existing books
- Delete books
- Search books
- Manage library collection
- View available and issued book quantities

### User can:

- Login as a user
- Access the User Dashboard
- Browse available books
- Search books
- View library information

---

# ✨ Features

## 🔐 Authentication

- Admin Login
- User Login
- Role Selection
- Role-Based Dashboard Redirect
- Session Management using LocalStorage
- Logout Functionality
- Protected Admin Dashboard

---

# 👨‍💼 Admin Features

- Admin Dashboard
- Total Books Statistics
- Available Books Statistics
- Issued Books Statistics
- Add Books
- Edit Books
- Delete Books
- Search Books
- Manage Library Collection
- Responsive Sidebar Navigation
- Live Backend Data

---

# 👤 User Features

- User Dashboard
- User Login
- Browse Books
- Search Books
- View Available Books
- Responsive Interface
- Logout Functionality

---

# 📚 Book Management

The system supports complete CRUD operations for books.

### Operations

- ➕ Add Book
- 📖 View Books
- ✏️ Edit Book
- 🗑️ Delete Book
- 🔎 Search Book

### Search By

- Book Title
- Author
- Category
- ISBN

### Book Information

- Book ID
- Title
- Author
- Category
- ISBN
- Quantity
- Available Quantity

---

# 🎨 UI/UX Features

- Modern Login Page
- Responsive Dashboard
- Professional Sidebar
- Dashboard Statistics Cards
- Responsive Tables
- Search Interface
- Add/Edit Book Modals
- Clean Forms
- Hover Effects
- Mobile Responsive Design
- Modern Library Theme

---

# 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5 |
| Styling | CSS3 |
| Frontend Logic | Vanilla JavaScript |
| Backend | Java Spring Boot |
| Language | Java |
| ORM | Spring Data JPA / Hibernate |
| Database | MySQL |
| Build Tool | Maven |
| Version Control | Git & GitHub |
| Frontend Hosting | Render |
| Backend Hosting | Render |
| Database Hosting | Aiven MySQL |

---

# 📁 Project Structure

```text
LibraryManagementSystem/
│
├── ModernLibraryFrontend/
│   │
│   ├── index.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── user.js
│   │   └── users.js
│   │
│   └── pages/
│       ├── login.html
│       ├── admin-dashboard.html
│       ├── user-dashboard.html
│       ├── settings.html
│       └── users.html
│
├── library-backend/
│   │
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── library/
│   │       │           └── library_backend/
│   │       │               ├── controller/
│   │       │               ├── entity/
│   │       │               ├── repository/
│   │       │               └── service/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
└── README.md
🔄 Application Architecture
                    USER
                     │
                     ▼
          ┌─────────────────────┐
          │      FRONTEND       │
          │ HTML + CSS + JS     │
          │      Render         │
          └──────────┬──────────┘
                     │
                     │ REST API
                     ▼
          ┌─────────────────────┐
          │       BACKEND       │
          │    Spring Boot      │
          │       Render        │
          └──────────┬──────────┘
                     │
                     │ JPA / Hibernate
                     ▼
          ┌─────────────────────┐
          │    MySQL DATABASE   │
          │       Aiven         │
          └─────────────────────┘
🔗 Backend API
Base URL
https://library-management-system-sql9.onrender.com
📚 Available Endpoints
Method	Endpoint	Description
GET	/books	Fetch all books
GET	/books/{id}	Fetch book by ID
POST	/books	Add a new book
PUT	/books/{id}	Update an existing book
DELETE	/books/{id}	Delete a book
📖 Example API
Get All Books
GET /books

Live API:

https://library-management-system-sql9.onrender.com/books

Example response:

[
  {
    "id": 1,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "category": "Fiction",
    "isbn": "9780062315007",
    "quantity": 5,
    "availableQuantity": 5
  }
]
🗄️ Database

The application uses MySQL as the database.

The backend connects to the production database using environment variables.

Sensitive database credentials are not stored directly in the source code.

Example configuration:

spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
💻 Local Development
1. Clone the Repository
git clone https://github.com/rohinig693-code/Library_Management_System.git

Go to the project directory:

cd Library_Management_System
🌐 Frontend Setup

Go to the frontend folder:

cd ModernLibraryFrontend

You can run the frontend using VS Code Live Server or a local HTTP server.

For example:

python -m http.server 5500

Then open:

http://localhost:5500
⚙️ Backend Setup

Go to the backend folder:

cd library-backend

Make sure Java and Maven are installed.

Run:

mvn spring-boot:run

The backend will start on:

http://localhost:8080
☁️ Deployment

The application is deployed using Render.

Frontend
https://library-management-frontend-9rjb.onrender.com/

The frontend is deployed as a Render Static Site.

Backend
https://library-management-system-sql9.onrender.com/

The backend is deployed as a Render Web Service.

Database

The application uses a cloud-hosted MySQL database.

🔒 Security

Sensitive credentials should be stored using environment variables.

The following should never be committed to GitHub:

Database passwords
API keys
Secret keys
.env files
Private credentials
🧪 Testing

The following functionality has been tested:

✅ Frontend deployment
✅ Backend deployment
✅ MySQL database connection
✅ Admin login
✅ User login
✅ Book loading
✅ Add Book
✅ Edit Book
✅ Delete Book
✅ Search Books
✅ Logout
✅ Frontend → Backend API communication
📊 Current Project Status
✅ Completed
Full responsive frontend
Login system
Admin dashboard
User dashboard
Role-based access
Book CRUD operations
Book search
Dashboard statistics
REST API integration
MySQL database integration
GitHub repository
Render frontend deployment
Render backend deployment
🚀 Future Improvements

Possible future enhancements:

JWT Authentication
Spring Security
User Registration
Book Borrow/Return System
Borrowing History
Fine Calculation
Email Notifications
Advanced Analytics
Admin User Management
Pagination
Book Cover Images
🎓 Learning Outcomes

This project helped demonstrate practical knowledge of:

Full Stack Development
Java Programming
Spring Boot
REST APIs
Spring Data JPA
Hibernate
MySQL
HTML5
CSS3
JavaScript
CRUD Operations
Authentication
Git & GitHub
Cloud Deployment
Frontend–Backend Integration
👩‍💻 Author
   Rohini
