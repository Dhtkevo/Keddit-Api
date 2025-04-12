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
