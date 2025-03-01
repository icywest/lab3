import fs from "fs";

const POSTS_FILE = "./models/posts.json";
const COMMENTS_FILE = "./models/comments.json";

export function getPublishedPosts() {
  try {
      if (!fs.existsSync(POSTS_FILE)) {
          return [];
      }
      const data = fs.readFileSync(POSTS_FILE, "utf8");
      const posts = JSON.parse(data) || [];
      return posts.filter(post => post.status === "published");
  } catch (error) {
      console.error(error);
      return [];
  }
}

export function getAllPosts() {
  try {
    let posts = [];
    let comments = [];

    if (fs.existsSync(POSTS_FILE)) {
      posts = JSON.parse(fs.readFileSync(POSTS_FILE, "utf8")) || [];
    }
    if (fs.existsSync(COMMENTS_FILE)) {
      comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8")) || [];
    }

    // Agregar los comentarios a cada post
    posts.forEach((post) => {
      post.comments = comments.filter((comment) => comment.postId === post.id);
    });

    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}