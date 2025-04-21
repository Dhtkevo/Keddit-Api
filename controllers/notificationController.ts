import { deleteNotification, getAllUserNotifications } from "../db/queries";

export const getAllUserNotificationsController = async (req, res) => {
  const { userId } = req.params;

  const notifications = await getAllUserNotifications(Number(userId));

  res.json(notifications);
};

export const deleteNotificationController = async (req, res) => {
  const { notifId } = req.params;

  await deleteNotification(Number(notifId));

  res.json({ message: "Notification deleted" });
};
