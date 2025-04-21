import express from "express";
import {
  checkUserFollowingController,
  followUserController,
  getAllUsersController,
  getUserFromIdController,
  unfollowUserController,
} from "../controllers/usersController";
import { notificationRouter } from "./notificationRouter";

export const userRouter = express.Router();

userRouter.use("/:userId/notifications", notificationRouter);

userRouter.get("/", getAllUsersController);

userRouter.get("/:userId", getUserFromIdController);

userRouter.post("/follow", followUserController);

userRouter.post("/unfollow", unfollowUserController);

userRouter.post("/check_following", checkUserFollowingController);
