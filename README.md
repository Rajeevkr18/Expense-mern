## Expense Management Application (MERN Stack)
This full-stack Expense Management application is built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to manage their expenses efficiently, providing features such as secure authentication, time-based filtering, and expense analytics.

## Features
User Authentication
Secure user registration and login with bcrypt for password hashing.
JWT-based authentication and authorization to protect user data.
## Expense Management
Perform CRUD operations to add, edit, and delete expenses.
User-friendly interface for managing expenses seamlessly.
Time-based Filtering
## Filter expenses by custom time ranges:
Monthly
Yearly
Weekly
## Expense Analytics
Visualize expenses through detailed charts and insights to help users analyze their spending patterns.

## Tech Stack
Frontend: React, Bootstrap, Ant Design
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT & bcrypt
Styling: Bootstrap, Ant Design

## Installation Instructions
Clone the repository:

## bash
git clone https://github.com/Rajeevkumar9065/Expense-mern
cd expense-management
Install dependencies:

## Backend:

## bash
cd backend
npm install
Frontend:

## bash
cd ../client
npm install

## Set up environment variables:
Create a .env file in the root of the project and add the following:

## bash
MONGO_URI=your_mongoDB_connection_string
JWT_SECRET=your_jwt_secret
Run the application:

From the root directory, run:

bash
npm run dev
This will start both the frontend and backend servers concurrently.
