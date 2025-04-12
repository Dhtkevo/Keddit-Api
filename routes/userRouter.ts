import express from "express";
import { getAllUsersController } from "../controllers/usersController";

export const userRouter = express.Router();

userRouter.get("/", getAllUsersController);
