import User from "../models/User.js";

export const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

export const findUserById = async (userId) => {
  return await User.findByPk(userId);
};

export const addUser = async (username, password) => {
  return await User.create({ username, password });
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
