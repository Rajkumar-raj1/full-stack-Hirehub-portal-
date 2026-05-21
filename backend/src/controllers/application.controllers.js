import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Application } from "../models/application.models.js";
import { Job } from "../models/job.models.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const applyToJob = asyncHandler(async (req, res) => {

    const { jobId } = req.params;

    const alreadyApplied = await Application.findOne({
        applicant: req.user?._id,
        job: jobId
    });

    if (alreadyApplied) {
        throw new ApiError(
            409,
            "You already applied to this job"
        );
    }

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    const resumeLocalPath = req.file?.path;

    let uploadedResume = {};

    if (resumeLocalPath) {

        const resume = await uploadOnCloudinary(
            resumeLocalPath
        );

        if (resume) {
            uploadedResume = {
                url: resume.url,
                public_id: resume.public_id
            };
        }
    }

    const application = await Application.create({
        applicant: req.user?._id,
        job: jobId,
        resume: uploadedResume
    });

    job.applications.push(application._id);

    await job.save({
        validateBeforeSave: false
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            application,
            "Applied to job successfully"
        )
    );
});

const getAppliedJobs = asyncHandler(async (req, res) => {

    const applications = await Application.find({
        applicant: req.user?._id
    })
    .populate({
        path: "job",
        populate: {
            path: "postedBy",
            select: "fullName email username"
        }
    })
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            applications,
            "Applied jobs fetched successfully"
        )
    );
});

const getApplicants = asyncHandler(async (req, res) => {

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (
        job.postedBy.toString() !== req.user?._id.toString() &&
        req.user?.role !== "admin"
    ) {
        throw new ApiError(
            403,
            "Unauthorized to view applicants"
        );
    }

    const applicants = await Application.find({
        job: jobId
    })
    .populate(
        "applicant",
        "fullName email username skills profilePhoto"
    )
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            applicants,
            "Applicants fetched successfully"
        )
    );
});

const updateApplicationStatus = asyncHandler(async (req, res) => {

    const { applicationId } = req.params;

    const { status } = req.body;

    const application = await Application.findById(
        applicationId
    ).populate("job");

    if (!application) {
        throw new ApiError(
            404,
            "Application not found"
        );
    }

    if (
        application.job.postedBy.toString() !== req.user?._id.toString() &&
        req.user?.role !== "admin"
    ) {
        throw new ApiError(
            403,
            "Unauthorized to update application status"
        );
    }

    application.status = status;

    await application.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            application,
            "Application status updated successfully"
        )
    );
});

export {
    applyToJob,
    getAppliedJobs,
    getApplicants,
    updateApplicationStatus
};