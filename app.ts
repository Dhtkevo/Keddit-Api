import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
