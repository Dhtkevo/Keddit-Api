const GitHubStrategy = require("passport-github2").Strategy;
import "dotenv/config";
import passport from "passport";
import { prisma } from "../db/prisma";
import { getUserFromIdDB, getUserGitHubDB } from "../db/queries";

interface UserExtended extends Express.User {
  id?: string;
}

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await prisma.user.findUnique({
        where: { githubId: profile.id },
      });

      if (!user) {
        await prisma.user.create({
          data: {
            githubId: profile.id,
            username: profile.username,
            avatarUrl: profile.photos[0].value,
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            username: profile.username,
            avatarUrl: profile.photos[0].value,
          },
        });
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user: UserExtended, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (user: number, done) => {
  const foundUser = await getUserFromIdDB(user);
  done(null, foundUser);
});
