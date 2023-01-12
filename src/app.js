import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { signUp, logIn } from "./user.js";
import { signUpHandler } from "./usererrorhandler.js";
import { isAuthorized } from "./auth.js";
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Homepage");
});
app.use("/api", isAuthorized);
app.post("/login", logIn);
app.post("/signup", signUpHandler, signUp);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Unfound" });
});
export default app;
