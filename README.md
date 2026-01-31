Event Management System – Backend

This is the backend for the Real-Time Event Management System, built using Node.js, Express, and MongoDB.
It handles user authentication, event creation and management, event registrations, and email reminders. The backend uses JWT for secure authentication and enforces role-based authorization so only event creators can edit or delete their events.

Features:-
User signup & login (JWT authentication)
Create, view, update, and delete events
Event registration with duplicate prevention
Creator-only edit and delete access
Email reminder notifications
Secure API with protected routes

Tech Stack:-
Node.js
Express.js
MongoDB (Mongoose)
JWT
SendGrid / Nodemailer

Run Locally:-
npm install
npm run dev

Environment Variables:-
MONGO_URI=
JWT_SECRET=
SENDGRID_API_KEY=
EMAIL_FROM=


This backend is designed to support a real-world event platform and is deployment-ready.
