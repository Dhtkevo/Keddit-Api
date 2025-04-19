import express from "express";
import {
  checkUserFollowingController,
  followUserController,
  getAllUsersController,
  getUserFromIdController,
  unfollowUserController,
} from "../controllers/usersController";

export const userRouter = express.Router();

userRouter.get("/", getAllUsersController);

userRouter.get("/:userId", getUserFromIdController);

userRouter.post("/follow", followUserController);

userRouter.post("/unfollow", unfollowUserController);

userRouter.post("/check_following", checkUserFollowingController);
