const express = require("express");
const router = express.Router();
const { updateTheme, fetchTheme } = require("../db/db_themes");

router.post("/update", async (req, res) => {
  await updateTheme(req.body);
  res.status(200).end();
});

router.get("/fetch", async (req, res) => {
  const data = await fetchTheme();
  res.status(200).json(data);
});

module.exports = router;
