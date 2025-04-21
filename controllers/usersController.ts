import {
  checkUserFollowingDB,
  createUserFollowNotification,
  followUserDB,
  getAllUsersDB,
  getUserFeedPosts,
  getUserFromIdDB,
  unfollowUserDB,
} from "../db/queries";

export const getAllUsersController = async (req, res) => {
  const users = await getAllUsersDB();
  res.json(users);
};

export const getUserFromIdController = async (req, res) => {
  const user = await getUserFromIdDB(Number(req.params.userId));

  res.json(user);
};

export const followUserController = async (req, res) => {
  const { userId, targetUserId } = req.body;

  await followUserDB(Number(userId), Number(targetUserId));
  await createUserFollowNotification(Number(userId), Number(targetUserId));

  res.json({ message: "User followed" });
};

export const unfollowUserController = async (req, res) => {
  const { userId, targetUserId } = req.body;

  await unfollowUserDB(Number(userId), Number(targetUserId));

  res.json({ message: "User unfollowed" });
};

export const checkUserFollowingController = async (req, res) => {
  const { userId, targetUserId } = req.body;

  const response = await checkUserFollowingDB(
    Number(userId),
    Number(targetUserId)
  );

  res.json(response);
};

export const getUserFeedController = async (req, res) => {
  const { userId } = req.params;

  const userFeed = await getUserFeedPosts(Number(userId));

  res.json(userFeed);
};
