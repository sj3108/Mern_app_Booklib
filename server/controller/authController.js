const userModel = require("../model/user");

const errorResponse = require("../utlis/errorresponse");

// JWT token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already present", 500));
    }
    const user = await userModel.create({ username, email, password });

    this.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Credentials!", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials!", 401));
    }
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Successfully!",
  });
};
