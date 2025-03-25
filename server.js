import session from "express-session";
import express from "express";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { findUserById } from "./controllers/userController.js";
import helpers from "./public/js/helper.js";
import MongoStore from "connect-mongo";
import "./models/mongo.js"; 
import fetch from "node-fetch";
import methodOverride from "method-override";

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

server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/sessionslab3",
        collectionName: "sessions",
        autoRemove: "interval",
        autoRemoveInterval: 10,
        crypto: {
          secret: process.env.SESSION_SECRET,
        },
      }),
      cookie: { maxAge: 5 * 60 * 1000, httpOnly: true },
    })
  );

server.use(methodOverride("_method"));

  server.use((req, res, next) => {
    console.log("Session:", req.session);
    res.locals.user = req.session.user || null;
    next();
  });
  


server.use("/auth", authRoutes);
server.use("/posts", postRoutes);

server.get('/login', (req, res) => {
    res.render('login', { title: 'Login / Create Profile' });
});

// base
server.get("/", (req, res) => {
  if(req.session.user) {
    res.redirect(`/profile/${req.session.user.id}`); 
  }
    res.render('login');
});

//Logout route
server.get("/logout", (req, res) => {
    res.redirect("/");
});

// Profile
server.get("/profile/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const searchQuery = req.query.search?.toLowerCase() || "";
    const sortOption = req.query.sort || "default";
    const page = parseInt(req.query.page) || 1;
    const limit = 3;

    // Fetch user posts from API
    const response = await fetch(`http://localhost:1000/posts/post/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data = await response.json();
    let userPosts = data.posts || [];

    // Filter by search query first
    if (searchQuery) {
      userPosts = userPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery)
      );
    }

    switch (sortOption) {
      case "title-asc":
        userPosts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        userPosts.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    
        // Pagination
        const totalPages = Math.ceil(userPosts.length / limit);
        userPosts = userPosts.slice((page - 1) * limit, page * limit);
    res.render("profile", { posts: userPosts, userId, searchQuery, sortOption, page, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

server.get("/posts/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = findUserById(userId);
    const response = await fetch(`/posts/post/${userId}`);
    const userPosts = await response.json();
    
    res.render("profile", { posts: userPosts, user, userId });
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

export default server;