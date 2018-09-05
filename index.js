const config = require("config");
const mongoose = require("mongoose");
const initMongoose = require("./initializers/initMongoose");
const homeRouter = require("./routers/homeRouter");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error(
    "FATAL Error: landMan_jwtPriveteKey environment variable is not set."
  );
  process.exit(1);
}

//initialize mongoose.
initMongoose();

//middleware configurations

//router configurations
app.use("/", homeRouter);

//Error Handler and loggers configurations

//start the server.

app.listen(3000, () => {
  console.log("Server running. Listening on port 3000");
});
