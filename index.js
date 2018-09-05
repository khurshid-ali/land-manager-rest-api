const config = require("config");
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

//middleware configurations

//router configurations

//Error Handler and loggers configurations
app.use("/", homeRouter);

//start the server.

app.listen(3000, () => {
  console.log("Server running. Listening on port 3000");
});
