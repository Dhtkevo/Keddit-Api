import express from "express";
import {
  getAllUsersController,
  getUserFromIdController,
} from "../controllers/usersController";

export const userRouter = express.Router();

userRouter.get("/", getAllUsersController);

userRouter.get("/:userId", getUserFromIdController);
