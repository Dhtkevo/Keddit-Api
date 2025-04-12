import { getAllUsersDB, getUserFromIdDB } from "../db/queries";

export const getAllUsersController = async (req, res) => {
  const users = await getAllUsersDB();
  res.json(users);
};

export const getUserFromIdController = async (req, res) => {
  const user = await getUserFromIdDB(Number(req.params.userId));

  res.json(user);
};
