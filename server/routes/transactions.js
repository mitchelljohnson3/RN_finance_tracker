const express = require("express");
const router = express.Router();

const {
  submitTransaction,
  deleteTransaction,
  fetchTransactions,
  fetchSummary,
} = require("../db/db_transaction");

router.post("/new", async (req, res) => {
  await submitTransaction(req.body);
  res.status(200).end();
});

router.post("/delete", async (req, res) => {
  await deleteTransaction(req.body);
  res.status(200).end();
});

router.post("/fetch", async (req, res) => {
  const data = await fetchTransactions(req.body);
  res.status(200).json(data);
});

router.post("/summary", async (req, res) => {
  const data = await fetchSummary(req.body);
  res.status(200).json(data);
});

module.exports = router;
