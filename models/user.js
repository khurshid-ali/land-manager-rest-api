const config = require("config");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, minlength: 2, maxlength: 255, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true
  },
  password: { type: String, nimLength: 5, maxlength: 1024, required: true },
  isAdmin: { type: Boolean }
});

UserSchema.methods.hashPassword = async function() {
  const passHash = await bcrypt.hash(this.password, 10);
  this.password = passHash;
};

UserSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.changePassword = async function(oldPassword, newPassword) {};

const User = mongoose.model("user", UserSchema);

const validateUserInput = function(reqBody) {
  const joiSchema = {
    name: Joi.string()
      .min(2)
      .max(255)
      .required(),
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

  return Joi.validate(reqBody, joiSchema);
};

module.exports.UserSchema = UserSchema;
module.exports.User = User;
module.exports.validateUserInput = validateUserInput;
