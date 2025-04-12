import { getAllUsersDB } from "../db/queries";

export const getAllUsersController = async (req, res) => {
  const users = await getAllUsersDB();
  res.json(users);
};
