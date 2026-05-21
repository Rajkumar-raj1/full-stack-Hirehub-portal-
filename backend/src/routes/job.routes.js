// src/routes/job.routes.js

import { Router } from "express";

import {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    getRecruiterJobs,
    searchJobs
} from "../controllers/job.controllers.js";

import verifyJWT from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/")
.get(getAllJobs)
.post(
    verifyJWT,
    createJob
);

router.route("/search")
.get(searchJobs);

router.route("/recruiter-jobs")
.get(
    verifyJWT,
    getRecruiterJobs
);

router.route("/:jobId")
.get(getSingleJob)
.patch(
    verifyJWT,
    updateJob
)
.delete(
    verifyJWT,
    deleteJob
);

export default router;