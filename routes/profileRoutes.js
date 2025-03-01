import express from "express";
import { checkSession, saveUsers } from "../controllers/authController.js";
import fs from "fs";

const router = express.Router();
const postsFilePath = "./models/posts.json";

const loadPosts = () => {
  try {
    return JSON.parse(fs.readFileSync(postsFilePath, "utf8"));
  } catch (error) {
    return [];
  }
};

router.get("/profile/:id", (req, res) => {
  const activeUser = checkSession();
  if (!activeUser) {
    return res.redirect("/login");
  }

  const user = saveUsers(req.params.id);
  const posts = loadPosts().filter((post) => post.authorId === user.userId);
  res.render("profile", { user, posts });
});

export default router;
