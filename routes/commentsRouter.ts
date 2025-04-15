import express from "express";
import { createCommentController } from "../controllers/commentsController";

export const commentsRouter = express.Router({ mergeParams: true });

commentsRouter.post("/", createCommentController);
