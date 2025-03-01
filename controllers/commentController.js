import fs from "fs";

const COMMENTS_FILE = "./models/comments.json";


export function getAllComments() {
    try {
        if (!fs.existsSync(COMMENTS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(COMMENTS_FILE, "utf8");
        return JSON.parse(data) || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export function getCommentsForPost(postId) {
    try {
        if (!fs.existsSync(COMMENTS_FILE)) {
            console.log("No existe comments.json, devolviendo []");
            return [];
        }
        const data = fs.readFileSync(COMMENTS_FILE, "utf8");
        const comments = JSON.parse(data) || [];
        return comments.filter(comment => comment.postId == postId); 
    } catch (error) {
        console.error(error);
        return [];
    }
}

export function addComment(postId, userId, username, content) {
    try {
        let comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8")) || [];

        const newComment = {
            id: comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1,
            postId,
            userId,
            username,
            content
        };

        comments.push(newComment);
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// delete all :P
export function deleteComment(commentId, userId) {
    try {
        let comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8")) || [];
        const commentIndex = comments.findIndex(c => c.id === commentId);

        if (commentIndex === -1) {
            return false;
        }

        if (comments[commentIndex].userId !== userId) {
            return false;
        }

        comments.splice(commentIndex, 1);
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

