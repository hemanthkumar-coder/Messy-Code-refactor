const validator = require("validator");


const validEmail = (email) => {
  return validator.isEmail(email);
};

const checkValidCreateRequest = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please Provide name",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please Provide email",
      });
    } else {
      if (!validEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Please Provide Valid Email",
        });
      }
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Password",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const checkValidLoginRequest = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please Provide email",
      });
    } else {
      if (!validEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Please Provide Valid Email",
        });
      }
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Password",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};


module.exports = { checkValidCreateRequest,checkValidLoginRequest };
