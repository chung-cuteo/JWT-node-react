/* eslint-disable no-console */

import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { corsOptions } from "~/config/corsOptions";
import APIs_V1 from "~/routes/v1/";

const app = express();

// Fix Cache from disk from ExpressJS
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Use Route APIs V1
app.use("/api/v1", APIs_V1);

const LOCAL_DEV_APP_PORT = 8017;
const LOCAL_DEV_APP_HOST = "localhost";

app.listen(LOCAL_DEV_APP_PORT, LOCAL_DEV_APP_HOST, () => {
  console.log(
    `Back-end Server is running successfully at Host: ${LOCAL_DEV_APP_HOST} and Port: ${LOCAL_DEV_APP_PORT}`
  );
});
