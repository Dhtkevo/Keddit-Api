import express from "express";
import cors from "cors";
import "dotenv/config";

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
