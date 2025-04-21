import express from "express";
import { getAllUserNotificationsController } from "../controllers/notificationController";

export const notificationRouter = express.Router({ mergeParams: true });

notificationRouter.get("/", getAllUserNotificationsController);
