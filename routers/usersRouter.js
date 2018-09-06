const _ = require("lodash");
const { User, validateUserInput } = require("../models/user");
const express = require("express");
const router = express.Router();

//GET /api/users/me
router.get("/me", async (req, resp) => {
  resp.send("hello me.");
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

  newUser = new User({ name, email, password });

  await newUser.hashPassword();

  newUser = await newUser.save();

  resp.send(_.pick(newUser, ["_id", "name", "email"]));
});

module.exports = router;
