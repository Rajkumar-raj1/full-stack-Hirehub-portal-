import { Router } from "express";

import {
    applyToJob,
    getAppliedJobs,
    getApplicants,
    updateApplicationStatus
} from "../controllers/application.controllers.js";

import verifyJWT from "../middlewares/auth.middlewares.js";

import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/apply/:jobId")
.post(
    verifyJWT,
    upload.single("resume"),
    applyToJob
);

router.route("/my-applications")
.get(
    verifyJWT,
    getAppliedJobs
);

router.route("/applicants/:jobId")
.get(
    verifyJWT,
    getApplicants
);

router.route("/status/:applicationId")
.patch(
    verifyJWT,
    updateApplicationStatus
);

export default router;