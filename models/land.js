const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LandSchema = new Schema({
  name: { type: String, required: true }
});

const Land = mongoose.model("land", LandSchema);

function validate() {}

module.exports.LandSchema = LandSchema;
module.exports.Land = Land;
module.exports.validate = validate;
