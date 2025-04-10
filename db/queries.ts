import { prisma } from "./prisma";

export const getUserGitHubDB = async (github_id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      githubId: github_id,
    },
    include: {
      post: true,
      comments: true,
      notifications: true,
    },
  });

  return user;
};
