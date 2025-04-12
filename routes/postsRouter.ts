import express from "express";
import { createPostController } from "../controllers/postsController";

export const postsRouter = express.Router();

postsRouter.post("/", createPostController);
