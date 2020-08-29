const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Survey = require("../models/survey");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../utils/validations.js");
const authCheck = require("../utils/auth");

router.get("/", (req, res) => res.send("Test"));

router.post("/auth/register", async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    gender,
    age,
    isCoordinator,
  } = req.body;
  console.log(req.body);

  const { valid, errors } = validateUserRegistration(
    name,
    email,
    password,
    confirmPassword
  );

  if (!valid) {
    res.json({ error: "Please enter valid details" });
  }

  const existingUser = await User.findOne({
    $or: [{ name }, { email }],
  });
  if (existingUser) {
    res.json({ error: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    name,
    gender,
    age,
    isCoordinator,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });
  await user.save();
  const token = jwt.sign({ id: user.id }, "mysecret");
  res.json({ token, id: user._id, ...user._doc });
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const { errors, valid } = validateUserLogin(email, password);
  if (!valid) {
    res.json({ error: "Not valid " });
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.json({ error: "User not found" });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    res.json({ error: "Wrong Credentials" });
  }

  const token = jwt.sign({ id: user.id }, "mysecret");
  res.json({ token, id: user._id, ...user._doc });
});

router.post("/api/survey", async (req, res) => {
  const { body, headers } = req;
  console.log(typeof body.minAge);
  const { id } = authCheck(headers.authorization);
  if (body.subject.trim() === "") {
    res.json({ error: "Enter the subject" });
  }
  const user = await User.findById(id);

  const newSurvey = new Survey({
    ...body,
    user: user.id,
    username: user.name,
    createdAt: new Date().toISOString(),
  });
  const survey = await newSurvey.save();
  res.json({ survey });
});

router.get("/api/survey/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findById(id);

    res.json(survey);
  } catch (err) {
    res.json({ error: err });
  }
});

router.put("/api/survey/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findByIdAndUpdate(id, req.body);

    res.json(survey);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get("/api/mysurveys", async (req, res) => {
  const { headers } = req;

  const { id } = authCheck(headers.authorization);
  try {
    const user = User.findById(id);
    console.log(user);

    const surveys = await Survey.find({ user: id });
    //  const surveys = await Survey.find();

    console.log(surveys.length);
    res.json(surveys);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get("/api/surveys", async (req, res) => {
  const { body, headers } = req;

  const { id } = authCheck(headers.authorization);
  try {
    const user = await User.findById(id);
    console.log(typeof user.age);

    const surveys = await Survey.find({
      $and: [
        { "responses.userId": { $ne: user.id } },
        { minAge: { $lte: user.age } },
        { $or: [{ genderSpecific: "all" }, { genderSpecific: user.gender }] },
      ],
    });
    //  const surveys = await Survey.find();

    console.log(surveys.length);
    res.json(surveys);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
