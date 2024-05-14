import express from "express";

import { createComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post(`/create`, verifyToken, createComment);
