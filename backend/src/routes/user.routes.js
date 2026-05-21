// src/routes/user.routes.js

import { Router } from "express";

import {
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
} from "../controllers/user.controllers.js";

import verifyJWT from "../middlewares/auth.middlewares.js";

import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(
    upload.single("profilePhoto"),
    registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(
    verifyJWT,
    logoutUser
);

router.route("/refresh-token").post(
    refreshAccessToken
);

router.route("/change-password").patch(
    verifyJWT,
    changeCurrentPassword
);

router.route("/current-user").get(
    verifyJWT,
    getCurrentUser
);

router.route("/update-account").patch(
    verifyJWT,
    updateAccountDetails
);
router.route("/:userId").get(
  verifyJWT,
  getUserById
);
router.route("/update-profile-photo").patch(
    verifyJWT,
    upload.single("profilePhoto"),
    updateProfilePhoto
);

router.route("/upload-resume").patch(
    verifyJWT,
    upload.single("resume"),
    uploadResume
);

export default router;