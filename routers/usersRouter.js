const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User, validateUserInput } = require("../models/user");
const authorize = require("../middleWares/authorize");
const express = require("express");
const router = express.Router();

//GET /api/users/me (Secure)
router.get("/me", authorize, async (req, resp) => {
  const { _id, name, email } = req.user;
  const me = await User.findById(_id);
  if (!me) throw new Error("User not found.");
  resp.send(_.pick(me, ["name", "email", "isAdmin"]));
});

//POST /api/users/register
router.post("/register", async (req, resp) => {
  var result = validateUserInput(req.body);

  if (result.error) return resp.status(400).send(result.error.details);

  const { name, email, password } = req.body;

  //check if email already exists
  let newUser = await User.findOne({ email });
  if (newUser)
    return resp
      .status(400)
      .send("User with email already registered. Try a new email address.");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  newUser = new User({ name, email, password: hash });

  newUser = await newUser.save();

  resp.send(_.pick(newUser, ["_id", "name", "email"]));
});

//POST /api/users/resetpassword
//Secured route.
router.post("/resetpassword", authorize, async (req, resp) => {
  const validationSchema = {
    email: Joi.string()
      .email()
      .required()
      .min(2)
      .max(255),
    oldPassword: Joi.string()
      .min(4)
      .max(12)
      .required(),
    newPassword: Joi.string()
      .min(4)
      .max(12)
      .required()
  };

  const result = Joi.validate(req.body, validationSchema);
  if (result.error) return resp.status(400).send(result.error.details);

  const { email, oldPassword, newPassword } = req.body;

  let userFound = await User.findOne({ email });

  if (!userFound) return resp.status(404).send("User does not exist");

  //verify password.
  const isPasswordVerified = await bcrypt.compare(
    oldPassword,
    userFound.password
  );

  if (!isPasswordVerified)
    return resp.status(403).send("original password does not match");

  const salt = await bcrypt.genSalt(10);
  const newHash = await bcrypt.hash(newPassword, salt);

  await User.findOneAndUpdate({ email }, { $set: { password: newHash } });

  resp.send("Password changed.");
});

module.exports = router;
