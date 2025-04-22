import express from "express";
import passport from "passport";

export const authRouter = express.Router();

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

authRouter.delete("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
  });
  res.json({ message: "Logged Out" });
});
