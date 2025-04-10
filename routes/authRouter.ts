import express from "express";
import passport from "passport";
import { getUserGitHubDB } from "../db/queries";

export const authRouter = express.Router();

interface UserExtended extends Express.User {
  id?: string;
}

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

authRouter.get("/current_user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

passport.serializeUser((user: UserExtended, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (user: string, done) => {
  const foundUser = await getUserGitHubDB(user);
  done(null, foundUser);
});
