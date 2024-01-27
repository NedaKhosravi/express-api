const express = require("express");
const validateToken = require("../middleware/validateTokenHandler")

const userRouter = express.Router();

const {registerUser, loginUser, currentUser} = require("../controllers/userController")

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/current", validateToken, currentUser);

module.exports = userRouter;
