const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const uuid = require("uuid").v4;

const db = require("../data/database");

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });
const router = express.Router();

router.get("/", async function (req, res) {
  const images = await db.getDb().collection("images").find().toArray();
  res.render("home", { images: images });
});

router.get("/signup", function (req, res) {
  let sessionData = req.session.inputData;

  if (!sessionData) {
    sessionData = {
      hasError: false,
      username: "",
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("signup", { inputData: sessionData });
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
    req.session.inputData = {
      hasError: true,
      message: "Invalid - please check your data",
      username: userName,
      email: userEmail,
      confirmEmail: userConfirmEmail,
      password: userPassword,
    };

    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: userEmail });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User already exists",
      username: userName,
      email: userEmail,
      confirmEmail: userConfirmEmail,
      password: userPassword,
    };

    req.session.save(function () {
      res.redirect("/signup");
    });

    return;
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

router.get("/login", function (req, res) {
  let sessionData = req.session.inputData;

  if (!sessionData) {
    sessionData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("login", { inputData: sessionData });
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
    req.session.inputData = {
      hasError: true,
      message: "Login failed - please check your credentials",
      email: userEmail,
      password: userPassword,
    };

    req.session.save(function () {
      res.redirect("/login");
    });

    return;
  }

  const passwordsMatch = await bcrypt.compare(
    userPassword,
    existingUser.password
  );

  if (!passwordsMatch) {
    req.session.inputData = {
      hasError: true,
      message: "Login failed -please check your credentials",
      email: userEmail,
      password: userPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });

    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/profile");
  });
});

router.get("/profile", function (req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }
  res.render("profile");
});

router.post("/profile", upload.single("image"), async function (req, res) {
  const uploadedImage = req.file;
  const imageTitle = req.body;

  await db.getDb().collection("images").insertOne({
    title: imageTitle.title,
    imagePath: uploadedImage.path,
  });

  res.redirect("/");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;

  res.redirect("/");
});

module.exports = router;
