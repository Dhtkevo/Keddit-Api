import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import "./passport/passport.js";
import session from "express-session";
import passport from "passport";
import { authRouter } from "./routes/authRouter.js";
import { postsRouter } from "./routes/postsRouter.js";
import { userRouter } from "./routes/userRouter.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://keddit-psi.vercel.app"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/users", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
