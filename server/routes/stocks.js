const express = require("express");

const db = require("../utils/database");

const router = express.Router();

router.post("/", (req, res) => {
  const name = req.body.name;
  const symbol = req.body.symbol;
  const marketPrice = req.body.marketPrice;
  const currentPrice = req.body.currentPrice;
  const sql =
    "INSERT INTO stocks (name,symbol,marketPrice,currentPrice) values (?,?,?,?)";
  db.query(sql, [name, symbol, marketPrice, currentPrice], (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results) {
      res.send(results);
    }
  });
});

router.get("/getStocks", (req, res) => {
  const sql = "SELECT * FROM stocks";
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    if (results) {
      res.send(results);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params["id"];
  const sql = "DELETE FROM stocks WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) console.log(err);
    if (results) {
      res.send(results);
    }
  });
});

module.exports = router;
