const mongoose = require("mongoose");
const {UserModel} = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "masai", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in 2." });
    }
    const { userId } = payload;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(401).send({ error: "User not found." });
      }
      // Set the user's email on the req object
      req._id = user._id;
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error." });
    }
  });
};

module.exports = { authenticate };
