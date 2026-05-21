import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.models.js";

const createJob = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        company,
        location,
        salary,
        jobType,
        experienceLevel,
        skillsRequired
    } = req.body;

    if (
        [
            title,
            description,
            company,
            location,
            salary,
            jobType,
            experienceLevel
        ].some((field) => field === undefined || field === "")
    ) {
        throw new ApiError(400, "All required fields must be provided");
    }

    if (
        req.user?.role !== "recruiter" &&
        req.user?.role !== "admin"
    ) {
        throw new ApiError(403, "Only recruiters can create jobs");
    }

    const job = await Job.create({
        title,
        description,
        company,
        location,
        salary,
        jobType,
        experienceLevel,
        skillsRequired,
        postedBy: req.user?._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            job,
            "Job created successfully"
        )
    );
});

const getAllJobs = asyncHandler(async (req, res) => {

    const jobs = await Job.find()
        .populate("postedBy", "fullName email username")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            jobs,
            "Jobs fetched successfully"
        )
    );
});

const getSingleJob = asyncHandler(async (req, res) => {

    const { jobId } = req.params;

    const job = await Job.findById(jobId)
        .populate("postedBy", "fullName email username");

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            job,
            "Job fetched successfully"
        )
    );
});

const updateJob = asyncHandler(async (req, res) => {

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (
        job.postedBy.toString() !== req.user?._id.toString() &&
        req.user?.role !== "admin"
    ) {
        throw new ApiError(403, "Unauthorized to update this job");
    }

    const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedJob,
            "Job updated successfully"
        )
    );
});

const deleteJob = asyncHandler(async (req, res) => {

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (
        job.postedBy.toString() !== req.user?._id.toString() &&
        req.user?.role !== "admin"
    ) {
        throw new ApiError(403, "Unauthorized to delete this job");
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Job deleted successfully"
        )
    );
});

const getRecruiterJobs = asyncHandler(async (req, res) => {

    const jobs = await Job.find({
        postedBy: req.user?._id
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            jobs,
            "Recruiter jobs fetched successfully"
        )
    );
});

const searchJobs = asyncHandler(async (req, res) => {

    const { keyword } = req.query;

    const jobs = await Job.find({
        $or: [
            {
                title: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                company: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                location: {
                    $regex: keyword,
                    $options: "i"
                }
            }
        ]
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            jobs,
            "Search results fetched successfully"
        )
    );
});

export {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    getRecruiterJobs,
    searchJobs
};
