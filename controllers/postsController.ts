import {
  createNewPostDB,
  getPostByIdDB,
  getPostsMatchingTitleDB,
  updatePostVotesDecrementDB,
  updatePostVotesIncrementDB,
} from "../db/queries";

export const createPostController = async (req, res) => {
  const { title, text, userId } = req.body;

  await createNewPostDB(title, text, userId);

  res.status(200).json({ message: "Post created" });
};

export const getPostByIdController = async (req, res) => {
  const { postId } = req.params;

  const foundPost = await getPostByIdDB(Number(postId));

  res.status(200).json(foundPost);
};

export const incrementPostVotesController = async (req, res) => {
  const { postId } = req.params;

  await updatePostVotesIncrementDB(Number(postId));

  res.json({ message: "Upvoted Post ID: " + postId });
};

export const decrementPostVotesController = async (req, res) => {
  const { postId } = req.params;

  await updatePostVotesDecrementDB(Number(postId));

  res.json({ message: "Upvoted Post ID: " + postId });
};

export const getMatchingPostsTitleController = async (req, res) => {
  const { title } = req.query;

  const searchResults = await getPostsMatchingTitleDB(title);

  res.json(searchResults);
};
