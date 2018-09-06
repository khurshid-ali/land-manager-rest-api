const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LandSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 255 }
});

const Land = mongoose.model("land", LandSchema);

function validate(reqBody) {
  const joiSchema = {
    name: Joi.string()
      .max(255)
      .min(3)
      .required()
  };

  return Joi.validate(reqBody, joiSchema);
}

module.exports.LandSchema = LandSchema;
module.exports.Land = Land;
module.exports.validate = validate;
