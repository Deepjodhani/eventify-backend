Event Management System – Backend

This is the backend for the Real-Time Event Management System, built using Node.js, Express, and MongoDB.
It handles user authentication, event creation and management, event registrations, and email reminders. The backend uses JWT for secure authentication and enforces role-based authorization so only event creators can edit or delete their events.

Features:-
1. User signup & login (JWT authentication),
2. Create, view, update, and delete events,
3. Event registration with duplicate prevention,
4. Creator-only edit and delete access,
5. Email reminder notifications,
6. Secure API with protected routes.

Tech Stack:-
1. Node.js,
2. Express.js,
3. MongoDB (Mongoose),
4. JWT,
5. SendGrid / Nodemailer.

Run Locally:-
npm install,
npm run dev.

Environment Variables:-
MONGO_URI=xxx,
JWT_SECRET=xxx,
SENDGRID_API_KEY=xxx,
EMAIL_FROM=xxx.


This backend is designed to support a real-world event platform and is deployment-ready.
