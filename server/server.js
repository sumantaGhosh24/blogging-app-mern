import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import {createServer} from "http";
import {Server} from "socket.io";

import connectDb from "./config/connectDb.js";
import corsOptions from "./config/corsOptions.js";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());

const http = createServer(app);
export const io = new Server(http);
import {SocketServer} from "./config/socket.js";

io.on("connection", (socket) => {
  SocketServer(socket);
});

app.use("/api", routes);

http.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
