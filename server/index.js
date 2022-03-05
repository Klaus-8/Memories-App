import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Memories API");
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(port, () => console.log(`listening to port ${port}`)))
  .catch((err) => console.log(err.message));
