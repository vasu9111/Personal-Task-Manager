import express from "express";
import mongoose from "mongoose";
import router from "./indexRoute.js";
import envData from "./src/config/index.js";
import cookieParser from "cookie-parser";
// import session from "express-session";
import errorCodes from "./errorCode.js";
import reminder from "./src/job/reminder.js";
import { dailyDigestJob } from "./src/job/dailyDigest.js";

const PORT = process.env.PORT;
console.log("envData.port", envData.port);
const MY_DB_URL = process.env.MY_DB_URL;

const app = express();
app.use(express.json());

mongoose
  .connect(MY_DB_URL)
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });
// app.use(
//   session({
//     secret: "7TDvew2EzG",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
//   })
// );
app.use(cookieParser());
reminder.start();
dailyDigestJob.start();
app.use("/api", router);
app.use((err, req, res, next) => {
  const errorCode = errorCodes[err.message];
  if (errorCode) {
    return res.status(errorCode.httpStatusCode).json(errorCode.body);
  }
  res.status(500).json({
    code: err.code || "server_crashed",
    message: err.message || "Server crashed",
  });
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
