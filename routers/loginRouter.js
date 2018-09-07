const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

//POST /api/login
router.post("/", async (req, resp) => {
  const loginSchema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(4)
      .max(12)
      .required()
  };

  const result = Joi.validate(req.body, loginSchema);
  if (result.error) return resp.status(400).send(result.error.details);

  const { email, password } = req.body;
  //get the user
  const userFound = await User.findOne({ email });

  if (!userFound)
    return resp.status(400).send("Incorrect user name and password.");

  //veryfy the password
  const isCorrectPassword = await bcrypt.compare(password, userFound.password);

  if (!isCorrectPassword)
    return resp.status(400).send("Incorrect user name and password.");

  //create a token and send the token over..
  resp.send("login successful.");
});

module.exports = router;
