import express from "express";
import {
  deleteNotificationController,
  getAllUserNotificationsController,
} from "../controllers/notificationController";

export const notificationRouter = express.Router({ mergeParams: true });

notificationRouter.get("/", getAllUserNotificationsController);

notificationRouter.delete("/:notifId", deleteNotificationController);
