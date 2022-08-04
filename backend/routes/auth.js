const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create  a User using: POST '/api/auth/createUser'. No login required
router.post("/createUser", [
  body('name', 'Enter the valid name').isLength({ min: 3 }),
  body('email', 'Enter the valid email').isEmail(),
  body('password', 'Password must be atleast 5 charachter').isLength({ min: 5 }),
], async (req, res) => {
  // If there are  errors, return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry user with this email already exists" })
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
