const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");
const authRouter = require("./src/routes/auth.route");
const casesRouter = require("./src/routes/cases.route");
const ApiError = require("./src/utilities/ApiError");
const sessionsRouter = require("./src/routes/sessions.route");
dotenv.config({
  path: ".env",
});
const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    credentials: true,
  })
);

app.use("/api/v2/users", authRouter);
app.use("/api/v2/cases", casesRouter);
app.use("/api/v2/sessions", sessionsRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(`this route is not correct ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 4000, () =>
  console.log("server is running....")
);
