import fs from "fs";

const usersFilePath = "./models/users.json";
const userSession = "./models/session.json";

export const loadUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
  } catch (error) {
    return [];
  }
};

export const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const logout = () => {
  fs.writeFileSync(userSession, JSON.stringify({}, null, 2));
};

export const findUserByUsername = (username) => {
  return loadUsers().find((user) => user.username === username);
};

export const findUserById = (userId) => {
  return loadUsers().find((user) => user.userId === parseInt(userId));
};

export const addUser = (username, password) => {
  const users = loadUsers();
  const userId = users.length ? users[users.length - 1].userId + 1 : 1;
  const newUser = { userId, username, password };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};
