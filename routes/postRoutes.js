import express from "express";
import fs from "fs";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
const POSTS_FILE = "./models/posts.json";

const readPosts = () => {
    if (!fs.existsSync(POSTS_FILE)) return [];
    return JSON.parse(fs.readFileSync(POSTS_FILE, "utf8"));
};

const savePosts = (posts) => {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
};

router.post("/add", authMiddleware, (req, res) => {
    const { title, content, status } = req.body;
    const user = req.session.user;

    if (!title || !content || !user) {
        return res.status(400).send("Invalid post data.");
    }

    const posts = readPosts();
    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title,
        content,
        author: user.username,
        authorId: user.userId,
        status
    };

    posts.push(newPost);
    savePosts(posts);

    res.redirect("/");
});


router.get("/edit/:id", authMiddleware, (req, res) => {
    const postId = parseInt(req.params.id);
    const post = readPosts().find(p => p.id === postId);

    if (!post || post.authorId !== req.session.user?.id) {
        return res.redirect("/profile");
    }

    res.render("editPost", { post });
});


router.post("/update/:id", authMiddleware, (req, res) => {
    const { title, content, status } = req.body;
    const posts = readPosts();
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));

    if (postIndex === -1 || posts[postIndex].authorId !== req.session.user.userId) {
        return res.status(403).send("You are not authorized to edit this post.");
    }
    // update the json data
    posts[postIndex].title = title;
    posts[postIndex].content = content;
    posts[postIndex].status = status;

    savePosts(posts);
    res.redirect("/");
});

router.post("/delete/:id", authMiddleware, (req, res) => {
    let posts = readPosts();
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));

    if (postIndex === -1 || posts[postIndex].authorId !== req.session.user.userId) {
        return res.status(403).send("You are not authorized to delete this post.");
    }

    posts.splice(postIndex, 1);
    savePosts(posts);

    res.redirect("/");
});


export default router;