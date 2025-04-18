import express from "express";
import {
  createPostController,
  decrementPostVotesController,
  getMatchingPostsTitleController,
  getPostByIdController,
  incrementPostVotesController,
} from "../controllers/postsController";
import { commentsRouter } from "./commentsRouter";

export const postsRouter = express.Router();

postsRouter.use("/:postId/comments", commentsRouter);

postsRouter.post("/", createPostController);

postsRouter.get("/search", getMatchingPostsTitleController);

postsRouter.get("/:postId", getPostByIdController);

postsRouter.put("/:postId/upvote", incrementPostVotesController);

postsRouter.put("/:postId/downvote", decrementPostVotesController);
