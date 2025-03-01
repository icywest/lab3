import fs from "fs";
import path from "path";

const usersFilePath = path.join("models", "users.json");

const loadUsers = () => {
  try {
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, "[]");
    }
    return JSON.parse(fs.readFileSync(usersFilePath, "utf8")) || [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
};

export const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error closing session:", err);
      return res.status(500).send("Error closing session");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};

export const findUserByUsername = (username) => {
  return loadUsers().find((user) => user.username === username);
};

export const findUserById = (userId) => {
  return loadUsers().find((user) => user.id === Number(userId));
};

export const addUser = (username, password) => {
  const users = loadUsers();
  const userId = users.length ? users[users.length - 1].userId + 1 : 1;
  const newUser = { userId, username, password };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};
