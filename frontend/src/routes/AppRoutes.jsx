import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import RecruiterLayout from "../layouts/RecruiterLayout.jsx";

import Home from "../pages/Home.jsx";
import Jobs from "../pages/Jobs.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/Profile.jsx";
import NotFound from "../pages/NotFound.jsx";

import Dashboard from "../pages/recruiter/Dashboard.jsx";
import PostJob from "../pages/recruiter/PostJob.jsx";
import MyJobs from "../pages/recruiter/MyJobs.jsx";
import Applicants from "../pages/recruiter/Applicants.jsx";
import EditJob from "../pages/recruiter/EditJob.jsx";
import ApplicantProfile from "../pages/recruiter/ApplicantProfile.jsx";
import MyApplications from "../pages/applicant/MyApplications.jsx";

import ProtectedRoute from "../components/common/ProtectedRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Public Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="jobs" element={<Jobs />} />

        <Route path="jobs/:jobId" element={<JobDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />

          <Route
            path="my-applications"
            element={<MyApplications />}
          />
        </Route>
      </Route>

      {/* Auth Layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Route>

      {/* Recruiter Layout */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["recruiter"]} />
        }
      >
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
<Route
  path="applicant-profile/:userId"
  element={<ApplicantProfile />}
/>
          <Route path="post-job" element={<PostJob />} />
          

          <Route path="my-jobs" element={<MyJobs />} />

          <Route path="edit-job/:jobId" element={<EditJob />} />

          <Route path="applicants/:jobId" element={<Applicants />} />
        </Route>
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
     
    </Routes>
    
  );
};

export default AppRoutes;