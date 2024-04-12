const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", async function (req, res) {
  res.render("home");
});

router.get("/signup", async function (req, res) {
  res.render("signup");
});

router.post("/signup", async function (req, res) {
  const userEnteredData = req.body;
  const userName = userEnteredData.username;
  const userEmail = userEnteredData.email;
  const userPassword = userEnteredData.password;

  const hashedPassword = await bcrypt.hash(userPassword, 12);

  const user = {
    username: userName,
    email: userEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.get("/login", async function (req, res) {
  res.render("login");
});

module.exports = router;
