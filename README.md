# 📚 LibraFlow - Modern Library Management System

[![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Hosting-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

LibraFlow is a robust, full-stack Library Management System designed to streamline operations for librarians and members alike. Built with the MERN stack, it offers a secure, scalable, and highly responsive dashboard to manage book inventories, track memberships, and monitor real-time library statistics.

🔗 **Live Application:** [View Demo](https://library-management-nu-gules.vercel.app/)

---

## ✨ Features

### 📚 Book Management
* **Inventory Control:** Effortlessly add, update, and delete books from the central catalog.
* **Smart Search:** Instant filtering and search capabilities by title, author, or genre.
* **Stock Tracking:** Real-time visibility of total vs. available book counts.

### 👥 Member Management
* **Profile Management:** Smooth onboarding, editing, and tracking of library members.
* **Automated IDs:** Auto-generated, unique Student IDs for seamless tracking.
* **Activity Logs:** Monitor member registration and details at a glance.

### 🔐 Authentication & Security
* **Secure Login:** Role-ready authentication system preventing unauthorized access.
* **Protected Routes:** Advanced frontend and backend route guards to secure sensitive data operations.

### 📊 Dynamic Dashboard
* **Real-time Analytics:** Quick-view counters for total books, active members, and issues.
* **Modern UI/UX:** Responsive design optimized for desktops, tablets, and smartphones.

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js, Vite, React Router, CSS3 (Modern Flexbox/Grid) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose (ODM) |
| **Dev Tools** | Git & GitHub, Postman, VS Code |
| **Deployment**| Vercel |

---

## 📂 Project Structure

```text
LibraFlow/
│
├── Frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI elements (Navbar, Sidebar, Cards)
│   │   ├── pages/         # Dashboard, Books, Members, Login pages
│   │   ├── hooks/         # Custom React hooks for API state management
│   │   ├── context/       # Authentication and Global state provider
│   │   └── assets/        # Images, icons, and local styles
│   └── package.json
│
├── Backend/
│   ├── config/            # Database connection configuration
│   ├── controllers/       # Business logic handlers for API routes
│   ├── middleware/        # Authentication and error handling middlewares
│   ├── models/            # Mongoose schemas (Book, Member, User)
│   ├── routes/            # Express API endpoint definitions
│   └── server.js          # Entry point for the backend application
│
└── README.md
