import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({
            validateBeforeSave: false
        });

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh tokens"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {

    const {
        fullName,
        email,
        username,
        password,
        role,
        company
    } = req.body;

    if (
        [fullName, email, username, password, role].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }
if (role === "recruiter" && !company?.trim()) {
  throw new ApiError(400, "Company name is required for recruiter");
}
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(
            409,
            "User with email or username already exists"
        );
    }

    const profilePhotoLocalPath = req.file?.path;

    let profilePhoto = {};

    if (profilePhotoLocalPath) {
        const uploadedPhoto = await uploadOnCloudinary(
            profilePhotoLocalPath
        );

        if (uploadedPhoto) {
            profilePhoto = {
                url: uploadedPhoto.url,
                public_id: uploadedPhoto.public_id
            };
        }
    }

    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        role,
        profilePhoto,
        company: role === "recruiter" ? company : "",
    });

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering user"
        );
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        )
    );
});

const loginUser = asyncHandler(async (req, res) => {

    const {
        email,
        username,
        password
    } = req.body;

    if (!(email || username)) {
        throw new ApiError(
            400,
            "Email or username is required"
        );
    }

    if (!password) {
        throw new ApiError(
            400,
            "Password is required"
        );
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    }).select("+password +refreshToken");

    if (!user) {
        throw new ApiError(
            404,
            "User does not exist"
        );
    }

    const isPasswordValid =
        await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Invalid user credentials"
        );
    }

    const {
        accessToken,
        refreshToken
    } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");

   const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
};
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
           returnDocument: "after"
        }
    );

   const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
};

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken =
        req.cookies.refreshToken ||
        req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(
            401,
            "Unauthorized request"
        );
    }

    try {

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(
            decodedToken?._id
        ).select("+refreshToken");

        if (!user) {
            throw new ApiError(
                401,
                "Invalid refresh token"
            );
        }

        if (
            incomingRefreshToken !== user.refreshToken
        ) {
            throw new ApiError(
                401,
                "Refresh token is expired or used"
            );
        }

        const {
            accessToken,
            refreshToken
        } = await generateAccessAndRefreshTokens(
            user._id
        );

        const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
};
        return res
            .status(200)
            .cookie(
                "accessToken",
                accessToken,
                options
            )
            .cookie(
                "refreshToken",
                refreshToken,
                options
            )
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken
                    },
                    "Access token refreshed successfully"
                )
            );

    } catch (error) {
        throw new ApiError(
            401,
            error?.message || "Invalid refresh token"
        );
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {

    const {
        oldPassword,
        newPassword
    } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(
            400,
            "Old and new passwords are required"
        );
    }

    const user = await User.findById(
        req.user?._id
    ).select("+password");

    const isPasswordCorrect =
        await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(
            400,
            "Invalid old password"
        );
    }

    user.password = newPassword;

    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password changed successfully"
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Current user fetched successfully"
            )
        );
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    bio,
    skills,
    company,
  } = req.body || {};

  const updatedFields = {};

  if (fullName !== undefined) {
    updatedFields.fullName = fullName;
  }
if (company !== undefined) {
  updatedFields.company = company;
}
  if (email !== undefined) {
    updatedFields.email = email;
  }

  if (phoneNumber !== undefined) {
    updatedFields.phoneNumber = phoneNumber;
  }

  if (bio !== undefined) {
    updatedFields.bio = bio;
  }

  if (skills !== undefined) {
    updatedFields.skills = Array.isArray(skills)
      ? skills
      : JSON.parse(skills);
  }

  if (Object.keys(updatedFields).length === 0) {
    throw new ApiError(400, "At least one field is required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: updatedFields,
    },
    {
      returnDocument: "after",
    }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Account details updated successfully"
    )
  );
});

const updateProfilePhoto = asyncHandler(async (req, res) => {

    const profilePhotoLocalPath = req.file?.path;

    if (!profilePhotoLocalPath) {
        throw new ApiError(
            400,
            "Profile photo is required"
        );
    }

    const uploadedPhoto = await uploadOnCloudinary(
        profilePhotoLocalPath
    );

    if (!uploadedPhoto) {
        throw new ApiError(
            500,
            "Error while uploading profile photo"
        );
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                profilePhoto: {
                    url: uploadedPhoto.secure_url,
                    public_id: uploadedPhoto.public_id
                }
            }
        },
        {
           returnDocument: "after"

        }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Profile photo updated successfully"
            )
        );
});

const uploadResume = asyncHandler(async (req, res) => {

    const resumeLocalPath = req.file?.path;

    if (!resumeLocalPath) {
        throw new ApiError(
            400,
            "Resume file is required"
        );
    }

    const uploadedResume = await uploadOnCloudinary(
        resumeLocalPath,
        "raw"
    );

    if (!uploadedResume) {
        throw new ApiError(
            500,
            "Error while uploading resume"
        );
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                resume: {
                    url: uploadedResume.secure_url,
                    public_id: uploadedResume.public_id
                }
            }
        },
        {
           returnDocument: "after"

        }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Resume uploaded successfully"
            )
        );
});
const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "User profile fetched successfully"
    )
  );
});
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateProfilePhoto,
    uploadResume,
    getUserById
};