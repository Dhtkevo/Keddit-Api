import { createNewPostDB } from "../db/queries";

export const createPostController = async (req, res) => {
  const { title, text, userId } = req.body;

  await createNewPostDB(title, text, userId);

  res.status(200).json({ message: "Post created" });
};
