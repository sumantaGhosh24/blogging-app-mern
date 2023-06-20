import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import connectDb from "./config/connectDb.js";
import corsOptions from "./config/corsOptions.js";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

connectDb();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/api", (req, res) => {
  return res.json({message: "Blogging Website MERN API!"});
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
