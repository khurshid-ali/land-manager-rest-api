const express = require("express");
const { Land, validate } = require("../models/land");
const authorize = require("../middleWares/authorize");
const router = express.Router();

//all route handlers for this router are secured.
router.use(authorize);

//GET /api/lands
router.get("/", async (req, resp) => {
  const lands = await Land.find();
  resp.send(lands);
});

//GET /api/lands/:id
router.get("/:id", async (req, resp) => {
  const { id } = req.params;

  if (!id) return resp.status(400).send("id is required");

  const land = await Land.findById(id);

  if (!land) return resp.status(404).send(`Land not found with id ${id}`);

  resp.send(land);
});

//POST /api/lands
router.post("/", async (req, resp) => {
  const result = validate(req.body);

  if (result.error) return resp.status(400).send(result.error.details);

  const { name } = req.body;

  let newLand = new Land({
    name
  });

  land = await newLand.save();

  resp.send(newLand);
});

module.exports = router;
