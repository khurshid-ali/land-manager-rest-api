const express = require("express");
const router = express.Router();

//GET /
router.get("/", (req, resp) => {
  resp.send("welcome home");
});

module.exports = router;
