const winston = require("winston");

module.exports = function() {
  winston.configure({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    level: "debug",
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "rest-api.log" })
    ]
  });

  winston.log("info", "== Winston configured....OK");
};
