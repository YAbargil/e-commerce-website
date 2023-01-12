import User from "../models/usermodel.js";
import { createToken } from "./auth.js";
import * as bcrypt from "bcrypt";

const salt = 8;
const hashPassword = (pw) => bcrypt.hash(pw, salt);
const comparePasswords = async (pw) =>
  bcrypt.compare(pw, await hashPassword(pw));
//after checking if everything's valid THEN you may create user.
const createUser = async (user) => {
  var tempUser = new User({
    username: user.username,
    email: user.email,
    password: await hashPassword(user.password), //crypted.
  });
  console.log(tempUser);
  var newUser = await tempUser
    .save()
    .then(console.log("Document saved!"))
    .catch((err) => {
      console.error(err);
      console.log("Document did NOT save");
    });
  var token = createToken(newUser);
  return { username: newUser.username, email: newUser.email, token };
};

export const signUp = async (req, res) => {
  var json = await createUser(req.body);
  console.log(json);
  res.status(201).json(json);
};

export const logIn = async (req, res) => {
  const user =
    (await User.findOne({
      username: req.body.username,
    })) || null;
  if (!user) {
    res.status(400).send({ msg: "User or password is incorrect." });
  } else {
    if (await comparePasswords(user.password)) {
      //password is correct
      var token = createToken(req.body);
      res.status(200).send({ message: "Entered Successfully!", token });
    } else {
      res
        .status(400)
        .send({ message: "User or password is incorrect.", token });
    }
  }
};
