# Product Management Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for product management with role-based access control.

## Features

- **Authentication**: JWT-based authentication
- **Role-Based Access**: Admin and Planner roles
- **User Management**: Admin can create and manage user accounts
- **Product Management**: View and manage products (API ready)

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Modern CSS with gradients and animations

## Project Structure

```
product-app/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── products.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   ├── .env
│   └── package.json
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── ProductList.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── App.css
    └── package.json
```

## Setup Instructions

### 1. Configure Environment Variables

Edit `server/.env` and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Create Initial Admin User

You'll need to manually create the first admin user in MongoDB or use a seed script. Here's a sample document:

```javascript
{
  "username": "admin",
  "password": "$2a$10$...", // Use bcrypt to hash "admin123" or your password
  "role": "admin",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

### 4. Run the Application

**Start Backend Server:**
```bash
cd server
npm start
```
Server runs on http://localhost:5000

**Start Frontend:**
```bash
cd client
npm run dev
```
Client runs on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Create new user (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin/Planner)
- `PUT /api/products/:id` - Update product (Admin/Planner)
- `DELETE /api/products/:id` - Delete product (Admin only)

## User Roles

### Admin
- Create and manage user accounts
- Full access to product management
- Delete products

### Planner
- View products
- Create and edit products
- Cannot delete products
- Cannot manage users

## Default Credentials

You need to create an initial admin user in MongoDB. Suggested credentials:
- Username: `admin`
- Password: `admin123`
- Role: `admin`

## Notes

- Product form (Add/Edit) will be implemented in the future
- Products are currently fetched from the API
- All API calls require authentication via JWT token
- CORS is enabled for frontend-backend communication
