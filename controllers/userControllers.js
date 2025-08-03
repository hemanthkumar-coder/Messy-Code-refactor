const User = require("../models/userModel");
const { Op } = require("sequelize");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const checkValidEmail = (email) => {
  return validator.isEmail(email);
};

const createUserContoller = async (req, res) => {
  try {
    const reqBody = req.body;
    const user = await User.create(reqBody);
    if (!user) {
      return res.status(400).json({
        success: "false",
        message: "User Not Created",
      });
    }
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

const getUsersControllers = async (req, res) => {
  try {
    const users = await User.findAll();
    if(users.length===0){
      return res.status(404).json({
        success:false,
        message:"users not found"
      })
    }
    res.status(200).json({
      message: "Retrieved Users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error ${error.message}`,
    });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Found",
      userDetails: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with Id ${userId} not found`,
      });
    }
    const { name, email } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Name",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Email",
      });
    }
    const updatedUser = await User.update(
      {
        name: name,
        email: email,
      },
      { where: { id: userId } }
    );
    res.status(201).json({
      success: true,
      message: "User Updated Successfully",
      userId: updatedUser[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Sever Error",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User with id ${userId} not found`,
      });
    }
    const deleteduser = await User.destroy({
      where: {
        id: userId,
      },
    });
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      userid: deleteduser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const searchUserByNameController = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a name to search",
      });
    }
    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!checkValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "User has no password set",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
module.exports = {
  getUsersControllers,
  createUserContoller,
  getUserByIdController,
  updateUserController,
  deleteUserById,
  searchUserByNameController,
  loginUserController,
};
