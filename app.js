require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/userRoutes");
const todoRouter = require("./routers/todoRoutes");

app.use(
  cors({
    origin: "https://multi-user-todo-app-server-production.up.railway.app/",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use("https://multi-user-todo-app-server-production.up.railway.app/auth", userRouter);
app.use("https://multi-user-todo-app-server-production.up.railway.app/api", todoRouter);

module.exports = app;
