import express from "express";
import {
  createPostController,
  getPostByIdController,
} from "../controllers/postsController";
import { commentsRouter } from "./commentsRouter";

export const postsRouter = express.Router();

postsRouter.use("/:postId/comments", commentsRouter);

postsRouter.post("/", createPostController);

postsRouter.get("/:postId", getPostByIdController);
