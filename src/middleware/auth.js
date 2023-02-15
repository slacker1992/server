const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const users = require("../model/users");
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      })
    );
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await users.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          success: false,
          message: `Role: ${req.user.role} is not allowed access this resource`,
        })
      );
    }
    next();
  };
};
