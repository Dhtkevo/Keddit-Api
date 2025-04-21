import { getAllUserNotifications } from "../db/queries";

export const getAllUserNotificationsController = async (req, res) => {
  const { userId } = req.params;

  const notifications = await getAllUserNotifications(Number(userId));

  res.json(notifications);
};
