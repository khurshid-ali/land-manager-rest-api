const config = require("config");
const mongoose = require("mongoose");
const homeRouter = require("./routers/homeRouter");
const express = require("express");
const app = express();

//check required environment variables.
if (!config.get("mongoDb.user") || !config.get("mongoDb.password")) {
  console.error(
    "FATAL: landMan_MongoUser, landMan_MongoPass environment variable are not set."
  );
  process.exit(1);
}

if (!config.get("jwtPrivateKey")) {
  console.error(
    "FATAL Error: landMan_jwtPriveteKey environment variable is not set."
  );
  process.exit(1);
}

//initialize mongoose.
const mongooseUri = `mongodb+srv://${config.get("mongoDb.user")}:${config.get(
  "mongoDb.password"
)}@${config.get("mongoDb.server")}/${config.get("mongoDb.database")}`;
console.log("connecting to:" + mongooseUri);
mongoose.connect(mongooseUri);
mongoose.connection
  .on("error", console.error.bind(console, "connection error:"))
  .once("open", function() {
    console.log("connection to monbodb is open.");
  });

//middleware configurations

//router configurations
app.use("/", homeRouter);

//Error Handler and loggers configurations

//start the server.

app.listen(3000, () => {
  console.log("Server running. Listening on port 3000");
});
