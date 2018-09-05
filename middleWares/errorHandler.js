const logger = require("winston"); //this will return the logger defined in index.js

module.exports = function(err, req, resp, next) {
  logger.error(err.message);
  resp.status(500).send("Some Errors occured.");
};
