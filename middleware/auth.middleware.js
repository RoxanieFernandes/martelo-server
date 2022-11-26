import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      const error = new Error("Request without token");
      throw error;
    }
    const [, token] = authorization.split(' ');

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...decodedToken };
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

export default auth;
