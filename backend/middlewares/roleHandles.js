import asyncHandler from "express-async-handler";

const authorizeRoles = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Forbidden: You do not have access");
    }
    next();
  });
};

export default authorizeRoles;
