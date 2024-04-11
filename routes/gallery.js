const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", async function (req, res) {
  res.render("home");
});

router.get("/signup", async function (req, res) {
  res.render("signup");
});

router.get("/login", async function (req, res) {
  res.render("login");
});

module.exports = router;
