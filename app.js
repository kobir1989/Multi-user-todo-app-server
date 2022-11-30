require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/userRoutes");
const todoRouter = require("./routers/todoRoutes");

app.use(
  cors({
    origin: "https://multi-user-todo-app-client-git-master-kobir1989.vercel.ap",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use("/auth", userRouter);
app.use("/api", todoRouter);

module.exports = app;
