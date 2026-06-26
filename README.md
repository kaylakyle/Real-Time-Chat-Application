💬 Real-Time Chat Application

A modern full-stack real-time chat application that enables users to communicate instantly through secure messaging. Built with modern web technologies, the platform delivers seamless real-time conversations, user authentication, and an intuitive chat interface designed for fast and reliable communication.

🌍 Problem

Traditional messaging applications often suffer from delayed communication, poor scalability, or overly complex user experiences. Users need a platform that allows them to connect instantly without refreshing pages while maintaining a clean and responsive interface.

This Real-Time Chat Application solves these challenges by providing a fast, secure, and scalable messaging platform powered by WebSockets, allowing conversations to happen instantly as messages are sent.

✨ Key Features
🔐 Secure User Authentication
Register and log in securely.
Password encryption for user security.
Protected routes for authenticated users.
💬 Real-Time Messaging
Instant message delivery using WebSocket technology.
No page refresh required.
Live updates across connected users.
👤 User Profiles
Personalized user accounts.
Profile information displayed during conversations.
Unique usernames for easy identification.
🟢 Online & Offline Status
View which users are currently online.
Automatically updates user presence in real time.
📱 Responsive User Interface
Optimized for desktop, tablet, and mobile devices.
Clean and modern chat layout.
Smooth user experience across screen sizes.
⚡ Live Notifications
Receive instant notifications when new messages arrive.
Real-time updates without manual refresh.
📂 Chat History
Messages are stored in the database.
Users can continue previous conversations after logging back in.
🔍 User Search
Find other registered users quickly.
Start conversations with just a few clicks.
🚪 Secure Logout
End sessions securely.
Prevent unauthorized account access.
🛠️ Technologies Used
Frontend

JavaScript
React.js
Axios
Socket.IO Client

Backend
Node.js
Express.js
Socket.IO
JWT Authentication
bcrypt.js
Database
MongoDB
Mongoose

🏗️ System Architecture
Client (React)
        │
        │ HTTP Requests
        ▼
Express API Server
        │
        ├──────── Authentication
        │
        ├──────── REST API
        │
        ▼
Socket.IO Server
        │
        ▼
Connected Users

        │
        ▼
MongoDB Database
📂 Project Structure
Real-Time-Chat-Application
│
├── client/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── services/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── config/
│
├── package.json
├── README.md
└── .env

🚀 Application Workflow
Users create an account or log in.
Authentication verifies credentials securely.
Users are connected to the Socket.IO server.
Online users become visible instantly.
Messages are exchanged in real time.
Chat history is stored in the database.
All connected users receive updates immediately.
📸 Screenshots
Login Page

Add screenshot here

Registration Page

Add screenshot here

Home Dashboard

Add screenshot here

Chat Interface

Add screenshot here

Online Users

Add screenshot here

Mobile Responsive View

Add screenshot here

⚙️ Installation
Clone the repository
git clone https://github.com/kaylakyle/Real-Time-Chat-Application.git
Navigate into the project
cd Real-Time-Chat-Application
Install backend dependencies
npm install
Install frontend dependencies
cd client
npm install
Configure Environment Variables

Create a .env file in the server directory.

PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:3000
Start the Backend
npm run server
Start the Frontend
cd client

npm start
👥 Demo

You can create your own account locally after running the project.

Or provide demo credentials if available.

Email: demo@example.com

Password: password123
