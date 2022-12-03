import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const verifyToken = (req, res, next) => {
  console.log("verifyToken", req.headers.token);

  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("You're not authenticated");
  }
};

export const verifyTokenAndAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that");
    }
  });
};

export const verifyTokenAdmin = asyncHandler((req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you're not Admin");
    }
  });
});
