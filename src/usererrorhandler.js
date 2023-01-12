import User from "../models/usermodel.js";
import { body, validationResult } from "express-validator";

export const isTaken = async (param) => {
  var userTaken = await User.findOne(param);
  if (userTaken == null) {
    console.log(`${param} is available`);
  } else {
    return {
      value: "ExistingError",
      msg: "already in use",
      param,
      location: "body",
    };
  }
};

const signUpValidator = [
  body("username")
    .isLength({ min: 4 })
    .withMessage("username must be at least 4 chars long")
    .isLength({ max: 12 })
    .withMessage(" username must be less than 12 chars long")
    .exists()
    .withMessage("username is required"),
  body("email").normalizeEmail().isEmail().withMessage("email is invalid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 chars long")
    .isLength({ max: 30 })
    .withMessage("password must be at max 30 chars long"),
];

const recordErrors = async (req, res, next) => {
  const errors = validationResult(req).array();
  //pushing is input param already taken errors to validationresult arr
  [
    await isTaken({ username: req.body.username }),
    await isTaken({ email: req.body.email }),
  ].forEach((err) => {
    if (err) {
      errors.push(err);
    }
  });
  if (errors.length > 0) {
    res.status(400).json({ errors: errors });
  } else {
    //you may proceed to signing up
    next();
  }
};

export const signUpHandler = [signUpValidator, recordErrors];
