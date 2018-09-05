const express = require("express");
const { Land, validate } = require("../models/land");
const router = express.Router();

//GET /api/lands
router.get("/", async (req, resp) => {
  const lands = await Land.find();

  throw Error("Custom error to check async error.");

  resp.send(lands);
});

//GET /api/lands/:id
router.get("/:id", async (req, resp, next) => {
  const { id } = req.params;

  if (!id) return resp.status(400).send("id is required");

  const land = await Land.findById(id);

  if (!land) return resp.status(404).send(`Land not found with id ${id}`);

  resp.send(land);
});

//POST /api/lands
router.post("/", async (req, resp, next) => {});

module.exports = router;
