import express from "express";
import {
  createPostController,
  getPostByIdController,
  incrementPostVotesController,
} from "../controllers/postsController";
import { commentsRouter } from "./commentsRouter";

export const postsRouter = express.Router();

postsRouter.use("/:postId/comments", commentsRouter);

postsRouter.post("/", createPostController);

postsRouter.get("/:postId", getPostByIdController);

postsRouter.put("/:postId/upvote", incrementPostVotesController);
