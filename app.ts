import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import "./passport/passport.js";
import session from "express-session";
import passport from "passport";
import { authRouter } from "./routes/authRouter.js";

const port = process.env.PORT;

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

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
