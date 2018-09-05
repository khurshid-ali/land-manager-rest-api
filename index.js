const express = require("express");
const app = express();

//middleware configurations

//router configurations

//Error Handler and loggers configurations

app.use("/", (req, resp) => {
  console.log("some changes");
  resp.send("Hello world");
});

//start the server.

app.listen(3000, () => {
  console.log("Server running. Listening on port 3000");
});
