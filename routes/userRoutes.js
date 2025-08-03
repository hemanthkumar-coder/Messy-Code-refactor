const express = require("express");
const {
  getUsersControllers,
  createUserContoller,
  getUserByIdController,
  updateUserController,
  deleteUserById,
  searchUserByNameController,
  loginUserController,
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/users", createUserContoller);
userRouter.get("/users", getUsersControllers);
userRouter.get("/user/:id", getUserByIdController);
userRouter.put("/user/:id", updateUserController);
userRouter.delete("/user/:id", deleteUserById);
userRouter.get("/search", searchUserByNameController);
userRouter.post("/login", loginUserController);

module.exports = userRouter;
