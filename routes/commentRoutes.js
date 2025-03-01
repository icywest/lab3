import express from "express";
import { addComment, deleteComment} from "../controllers/commentController.js";

const router = express.Router();

router.post("/add", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const { postId, comment } = req.body;
  addComment(parseInt(postId), req.session.user.id, req.session.user.username, comment);
  res.redirect("/");
});

router.post("/delete/:id", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const commentId = parseInt(req.params.id);
  const success = deleteComment(commentId, req.session.user.id);

  if (!success) {
    return res.status(403).send("this doesnt work tbh");
  }

  res.redirect("/");
});

export default router;
