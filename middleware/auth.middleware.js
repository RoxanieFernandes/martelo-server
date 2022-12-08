import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const error = new Error("Request without token");
    throw error;
  }
  const [, token] = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...decodedToken };
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export default auth;
