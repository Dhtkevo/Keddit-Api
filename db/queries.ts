import { prisma } from "./prisma";

export const getUserGitHubDB = async (github_id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      githubId: github_id,
    },
    include: {
      post: {
        include: {
          comments: true,
        },
      },
      comments: true,
      notifications: true,
    },
  });

  return user;
};

export const getAllUsersDB = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const createNewPostDB = async (
  title: string,
  text: string,
  userId: number
) => {
  await prisma.post.create({
    data: {
      title: title,
      text: text,
      userId: userId,
    },
  });
};

export const createCommentDB = async (
  text: string,
  userId: number,
  postId: number
) => {
  await prisma.comment.create({
    data: {
      text: text,
      userId: userId,
      postId: postId,
    },
  });
};

export const getPostByIdDB = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  return post;
};

export const getUserFromIdDB = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      post: {
        include: {
          comments: true,
        },
      },
    },
  });

  return user;
};
