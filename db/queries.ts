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

export const updatePostVotesIncrementDB = async (postId: number) => {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      upVotes: {
        increment: 1,
      },
    },
  });
};

export const updatePostVotesDecrementDB = async (postId: number) => {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      upVotes: {
        decrement: 1,
      },
    },
  });
};

export const getPostsMatchingTitleDB = async (query: string) => {
  const results = await prisma.post.findMany({
    where: {
      title: {
        contains: query,
      },
    },
    include: {
      comments: true,
      user: true,
    },
  });

  return results;
};

export const followUserDB = async (userId: number, targetUserId: number) => {
  await prisma.user.update({
    where: {
      id: targetUserId,
    },
    data: {
      followedBy: {
        connect: { id: userId },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        connect: { id: targetUserId },
      },
    },
  });
};

export const unfollowUserDB = async (userId: number, targetUserId: number) => {
  await prisma.user.update({
    where: {
      id: targetUserId,
    },
    data: {
      followedBy: {
        disconnect: { id: userId },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        disconnect: { id: targetUserId },
      },
    },
  });
};
