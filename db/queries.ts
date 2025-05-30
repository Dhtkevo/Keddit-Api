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
      notifications: true,
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

export const checkUserFollowingDB = async (
  userId: number,
  targetUserId: number
) => {
  const followedUser = await prisma.user.findFirst({
    where: {
      AND: [
        { id: targetUserId },
        {
          followedBy: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
  });

  return followedUser;
};

export const createUserFollowNotification = async (
  loggedUserId: number,
  targetUserId: number
) => {
  const loggedUser = await prisma.user.findUnique({
    where: { id: loggedUserId },
  });
  await prisma.user.update({
    where: { id: targetUserId },
    data: {
      notifications: {
        create: {
          type: "New Follower",
          message: `${loggedUser?.username} has followed your account.`,
        },
      },
    },
  });
};

export const getAllUserNotifications = async (userId: number) => {
  const notis = await prisma.notification.findMany({
    where: { userId: userId },
  });

  return notis;
};

export const deleteNotification = async (notifId: number) => {
  await prisma.notification.delete({ where: { id: notifId } });
};

export const getUserFeedPosts = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { following: true },
  });

  if (!user) return null;

  const followingUserIds: number[] = [];

  for (let following of user?.following) {
    followingUserIds.push(following.id);
  }

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { id: userId },
        {
          userId: {
            in: followingUserIds,
          },
        },
      ],
    },
    include: { comments: true, user: true },
  });

  return posts;
};
