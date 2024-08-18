import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
require("dotenv").config();

import router from "./routers";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

const MONGO_URL = process.env.MONGODB_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (err: Error) => console.log(err));

app.use("/", router());
