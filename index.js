const express = require("express");
require("express-async-errors"); //wraps an async error handler around all route handlers.
const config = require("config");
const initWinston = require("./initializers/initWinston");
const initMongoose = require("./initializers/initMongoose");
const homeRouter = require("./routers/homeRouter");
const landsRouter = require("./routers/landRouter");
const usersRouter = require("./routers/usersRouter");
const loginRouter = require("./routers/loginRouter");
const errorHandler = require("./middleWares/errorHandler");

const app = express();

console.log("==============================================================");
console.log("== Land Manager Rest Api");
console.log("==");

if (!config.get("jwtPrivateKey")) {
  console.error(
    "FATAL Error: landMan_jwtPriveteKey environment variable is not set."
  );
  process.exit(1);
}

//initialize winston for logging.
initWinston();
//initialize mongoose.
initMongoose();
console.log("== initialization....OK");

//middleware configurations
app.use(express.json()); //without this req.body will not have any data.
console.log("== Middlewares initialized...OK");

//router configurations
app.use("/", homeRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/lands", landsRouter);
console.log("== Routers initialized...OK");

//Error Handler and loggers configurations
//this should be called at the last.
app.use(errorHandler);

//start the server.

const port = config.get("port") || 3000;

app.listen(port, () => {
  console.log(`== Server running. Listening on port ${port}`);
});
