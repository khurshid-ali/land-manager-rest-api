const config = require("config");
const mongoose = require("mongoose");

module.exports = function() {
  //check required environment variables.
  if (!config.get("mongoDb.user") || !config.get("mongoDb.password")) {
    console.error(
      "FATAL: landMan_MongoUser, landMan_MongoPass environment variable are not set."
    );
    process.exit(1);
  }

  //build the mongoose uri from the config settgings
  const mongooseUri = `mongodb+srv://${config.get("mongoDb.user")}:${config.get(
    "mongoDb.password"
  )}@${config.get("mongoDb.server")}/${config.get("mongoDb.database")}`;

  //connect to mongoose
  mongoose.connect(mongooseUri);

  //open connection to mongoose.
  mongoose.connection
    .on("error", console.error.bind(console, "connection error:"))
    .once("open", function() {
      console.log("connection to monbodb is open.");
    });
};
