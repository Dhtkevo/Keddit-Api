import { createCommentDB } from "../db/queries";

export const createCommentController = async (req, res) => {
  const { userId, commentText } = req.body;
  const { postId } = req.params;

  await createCommentDB(commentText, Number(userId), Number(postId));

  res.json({ message: "Comment created" });
};
