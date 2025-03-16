import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
    const {token} = req.cookies
  // console.log(req.headers);
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Access denied. No token provided.... " });
  }
  try {
    const decoded = jwt.verify(token, "secret");
    if (!decoded || decoded.role !== "admin") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not a admin...." });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Invalid or expired token.",
    });
  }
};
export default authMiddleware;
