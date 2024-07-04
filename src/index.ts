import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";

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

const MONGO_URL =
  "mongodb+srv://rofiyevdilshod:LBiypjLEMI2p3j2L@cluster1.dwj1o98.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (err: Error) => console.log(err));

app.use("/", router());
