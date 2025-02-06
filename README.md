---

# 📚 Bookstore Project

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

This full-stack web application is designed to provide a seamless online book shopping experience. The platform offers comprehensive functionality for both customers and administrators, featuring secure authentication, real-time inventory management, and an intuitive shopping interface.

## 📱 App Most Relevant Pages

### Customer Interface

The home page showcases a modern, intuitive interface featuring a responsive navigation bar, dynamic book categories, and a featured books carousel. Users can easily browse through different book collections and access key features such as the add to cart functionality.

![home-page-bookstore](https://github.com/user-attachments/assets/e37d115e-f757-4084-8b15-ff6a8dedce17)

The book details page offers an extensive array of information about each book. This includes the cover image, title, author, price, and a detailed description. Users can also see the curators team rating of the book and add the item to their shopping cart directly from this page. The screenshot below demonstrates the mobile view, highlighting the application's responsive design capabilities.

![single-book-phone-view-bookstore](https://github.com/user-attachments/assets/2aa264aa-608c-447c-8f3e-e98aec495738)

The shopping cart interface allows users to review their selected items, remove them, and see real-time price calculations.

![cart-bookstore](https://github.com/user-attachments/assets/83be9744-002a-4fc0-bb44-9d0077b7269f)

Users can track their order history through a clean, organized interface that displays order data. 

![orders-bookstore](https://github.com/user-attachments/assets/654c727b-ffe7-4c16-914f-99425279a855)

### Admin Interface

The admin dashboard provides a comprehensive overview of the store's performance, featuring real-time analytics, recent orders, inventory status, and user activity metrics. Administrators can quickly access all management functions from this central hub.

![dashboard-bookstore](https://github.com/user-attachments/assets/8414732c-29de-4638-a2ed-c3cac08d809f)

The book management interface enables administrators to add, update and delete books. The form includes fields for all relevant book details, with real-time validation.

![update-book-bookstore](https://github.com/user-attachments/assets/c749ad90-22fe-4a05-90af-94c2de64ed23)

## ✨ Key Features

- **User Authentication & Authorization**
  - Login and registration via Google powered by Firebase
  - JWT-based session management
  - Role-based access control (User/Admin)

- **Shopping Experience**
  - Filtering capabilities
  - Real-time inventory updates
  - Intuitive shopping cart management
  - Secure checkout process
  - Order history tracking

- **Admin Dashboard**
  - Comprehensive inventory management
  - Sales analytics and reporting
  - User management system
  - Order processing workflow

- **Technical Features**
  - Responsive design for all devices
  - Progressive Web App (PWA) capabilities
  - Real-time data synchronization
  - Optimized performance and loading times

## 🛠 Tech Stack

### Frontend Tools
| Technology | Purpose |
|------------|---------|
| React | A JavaScript library for building user interfaces, enabling the creation of reusable UI components. |
| Redux | A state management library for JavaScript apps, providing a predictable way to manage and update application state. |
| Tailwind CSS | A utility-first CSS framework for rapidly building custom user interfaces. |
| React Router DOM | A library for enabling dynamic routing in a web application, allowing navigation without refreshing the page. |
| React Hook Form | A library for managing forms in React, offering easy validation and submission handling. |
| Axios | A promise-based HTTP client for making API requests, handling responses, and managing errors. |
| Swiper | A modern mobile touch slider for creating interactive carousels and sliders. |
| SweetAlert2 | A versatile library that enables the design of engaging and adaptable alerts, popups, and notifications. |

### Backend Tools
| Technology | Purpose |
|------------|---------|
| Express.js | A minimal and flexible Node.js web application framework for building RESTful APIs and web applications. |
| Mongoose | An Object Data Modeling library for MongoDB, providing a straightforward schema-based solution to model application data. |
| JWT | JSON Web Tokens, used for securely transmitting information between parties as a JSON object, primarily for authentication and authorization. |
| Firebase Admin SDK | A server-side library for integrating Firebase services such as authentication, database management, and cloud storage. |
| CORS | Middleware for handling Cross-Origin Resource Sharing, allowing secure communication between the frontend and backend. |
| dotenv | A module for loading environment variables from a `.env` file, ensuring secure and manageable configuration. |
| nodemon | A development tool that automatically restarts the server when file changes are detected, improving development efficiency. |

### Database & Storage
| Service | Purpose |
|---------|----------|
| MongoDB | A NoSQL document-oriented database used for storing and managing application data. |
| Firebase Storage | A cloud-based service for storing user data and enabling Google login/sign-up functionality. |

---
