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
  const userConfirmEmail = userEnteredData["confirm-email"];
  const userPassword = userEnteredData.password;

  if (
    !userName ||
    !userEmail ||
    !userPassword ||
    userPassword.trim().length < 6 ||
    userEmail !== userConfirmEmail ||
    !userEmail.includes("@")
  ) {
    console.log("incorrect data");
    return res.redirect("/signup");
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: userEmail });

  if (existingUser) {
    console.log("user already exists");
    return res.redirect("/signup");
  }

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

router.post("/login", async function (req, res) {
  const userEnteredData = req.body;
  const userEmail = userEnteredData.email;
  const userPassword = userEnteredData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: userEmail });

  if (!existingUser) {
    console.log("Login failed! - Not existing user");
    return res.redirect("/login");
  }

  const passwordsMatch = await bcrypt.compare(
    userPassword,
    existingUser.password
  );

  if (!passwordsMatch) {
    console.log("Login failed - Passwords do not match");
    return res.redirect("/login");
  }

  console.log("user authenticated");
  res.redirect("/profile");
});

router.get("/profile", async function (req, res) {
  res.render("profile");
});

module.exports = router;
