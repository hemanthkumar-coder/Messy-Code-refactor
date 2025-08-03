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
const {
  checkValidCreateRequest,
  checkValidLoginRequest,
} = require("../middlewares/userMiddlewares");

const userRouter = express.Router();

userRouter.post("/users", checkValidCreateRequest, createUserContoller);
userRouter.get("/users", getUsersControllers);
userRouter.get("/user/:id", getUserByIdController);
userRouter.put("/user/:id", updateUserController);
userRouter.delete("/user/:id", deleteUserById);
userRouter.get("/search", searchUserByNameController);
userRouter.post("/login", checkValidLoginRequest, loginUserController);

module.exports = userRouter;
