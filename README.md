# HireHub – Full Stack MERN Job Portal

HireHub is a full-stack MERN job portal application that connects job seekers with recruiters.  
Job seekers can create profiles, upload resumes, search jobs, and apply for positions, while recruiters can post jobs, manage applications, and review applicant profiles.

---


## Live Demo

🚀 Frontend (Live App):  
https://full-stack-hirehub-portal.vercel.app

⚙️ Backend API:  
https://hirehub-backend-38px.onrender.com/api/v1


---


## Features

### Job Seeker Features
- User registration and login
- JWT authentication
- Profile management
- Upload profile photo
- Upload resume (PDF)
- Search and filter jobs
- View job details
- Apply for jobs
- Track application status
- View own applications

---

### Recruiter Features
- Recruiter registration and login
- Recruiter dashboard
- Post new jobs
- Edit posted jobs
- Delete jobs
- View all applicants for a job
- Accept / Reject applicants
- View complete applicant profile
- Review applicant resume and qualifications

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Cookie Parser
- CORS
- dotenv

---

## Project Structure

```bash
HireHub/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   └── styles/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
│   │   └── constants.js
│   ├── public/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Rajkumar-raj1/full-stack-Hirehub-portal-.git
cd full-stack-Hirehub-portal-
```

---

## Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend server:

```bash
npm run dev
```

---

## Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

## API Features

### Authentication
- Register User
- Login User
- Logout User
- Refresh Token

### User
- Get Current User
- Update Profile
- Upload Profile Photo
- Upload Resume
- Change Password
- View Public Applicant Profile

### Jobs
- Create Job
- Get All Jobs
- Get Single Job
- Update Job
- Delete Job
- Get Recruiter Jobs

### Applications
- Apply for Job
- Get User Applications
- Get Job Applicants
- Update Application Status

---

## Screens / Modules

### Job Seeker
- Home Page
- Jobs Listing
- Job Details
- Login / Register
- Profile Page
- My Applications

### Recruiter
- Dashboard
- Post Job
- My Jobs
- Edit Job
- Applicants List
- Applicant Profile

---

## Security
- JWT authentication
- Protected routes
- Role-based authorization
- Secure resume storage via Cloudinary
- Password hashing

---

## Future Improvements
- Toast notifications
- Mobile responsiveness
- Saved jobs feature
- Email notifications
- Admin panel
- Interview scheduling
- AI job matching

---

## Author

**Raj Kumar Lodhi**  
Electronics & Communication Engineering  
MANIT Bhopal  

GitHub: https://github.com/Rajkumar-raj1

---
