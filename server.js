// this is insane
import session from "express-session";
import express from "express";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import { getAllPosts, getPublishedPosts } from "./controllers/postController.js";
import { findUserById } from "./controllers/authController.js";
import { getAllComments } from "./controllers/commentController.js";
import helpers from "./public/js/helper.js";


const server = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup the template engine
server.engine("handlebars", engine({ helpers }));
server.set('view engine', 'handlebars');
server.set('views', './views');

// Setup static files and body parsers
server.use(express.static(__dirname + '/public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,          
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,  
    }
}));

server.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


server.use("/auth", authRoutes);
server.use("/posts", postRoutes);
server.use("/comments", commentRoutes);

server.get('/login', (req, res) => {
    res.render('login', { title: 'Login / Create Profile' });
});

// base
server.get("/", (req, res) => {
    let posts = getPublishedPosts();

    if (!Array.isArray(posts)) {
        posts = [];
    }

    const allComments = getAllComments();
    
    posts = posts.map(post => ({
        ...post,
        comments: allComments.filter(comment => comment.postId === post.id)
    }));
    res.render("home", { posts });
});

//Logout route
server.get("/logout", (req, res) => {
    res.redirect("/");
});

// Profile
server.get("/profile/:userId", authMiddleware, (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = findUserById(userId);
    const userPosts = getAllPosts().filter(post => post.authorId === userId);
    
    res.render("profile", { posts: userPosts, user });
});

server.get("/posts/:userId", authMiddleware, (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = findUserById(userId);
    const userPosts = getAllPosts().filter(post => post.authorId === userId);
    
    res.render("profile", { posts: userPosts, user });
});

// error handling
server.use((req, res) => {
    res.status(404).render('404');
});

server.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('500', { err });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
