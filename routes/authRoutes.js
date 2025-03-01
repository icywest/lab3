import express from "express";
import { addUser, findUserByUsername, logout } from "../controllers/authController.js";


const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const { username, password, action } = req.body;

    if (action === "login") {
        const user = findUserByUsername(username);

        if (!user) {
            return res.render("login", { message: "User does not exist.", alertType: "error" });
        }

        if (user.password !== password) {
            return res.render("login", { message: "Incorrect password!", alertType: "error" });
        }

        req.session.user = user;
        return res.redirect(`/posts/${user.userId}`);

    } else if (action === "signup") {
        if (findUserByUsername(username)) {
            return res.render("login", { message: "User already exists!", alertType: "error" });
        }

        const newUser = addUser(username, password);
        req.session.user = newUser;
        return res.redirect(`/posts/${newUser.userId}`);

    }
});

router.get("/logout", logout);

export default router;
