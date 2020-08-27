const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../utils/validations.js");

router.get("/", (req, res) => res.send("Test"));

router.get("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      gender,
      age,
      isCoordinator,
    } = req.body;

    const { valid, errors } = validateUserRegistration(
      name,
      email,
      password,
      confirmPassword
    );

    if (!valid) {
      throw new Error("Errors", { errors });
    }

    const existingUser = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (existingUser) {
      throw new Error("User already exists!");
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
    return { token, id: user._id, ...user._doc };
  } catch (err) {
    throw err;
  }
});

module.exports = router;
