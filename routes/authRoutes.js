import express from "express";
import { body, validationResult } from "express-validator";
import { addUser, findUserByUsername, logout } from "../controllers/userController.js";

const router = express.Router();

// Validation rules for login and signup
const validateUser = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

// Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login & Signup Logic
router.post("/login", validateUser, async (req, res) => {
  const { username, password, action } = req.body;

  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("login", { 
      message: errors.array()[0].msg, 
      alertType: "error" 
    });
  }

  if (action === "login") {
    const user = await findUserByUsername(username);

    if (!user) {
      return res.render("login", { message: "User does not exist.", alertType: "error" });
    }

    if (user.password !== password) {
      return res.render("login", { message: "Incorrect password!", alertType: "error" });
    }

    req.session.user = user;
    return res.redirect(`/profile/${user.id}`);

  } else if (action === "signup") {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.render("login", { message: "User already exists!", alertType: "error" });
    }

    const newUser = await addUser(username, password);
    req.session.user = newUser;
    return res.redirect(`/profile/${newUser.id}`);
  }
});

// Logout
router.get("/logout", logout);

export default router;
