import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import lodash from "lodash";
export default async function verifyToken(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const decodedUser = decoded as { userId: string; role: string };
    req.userId = decodedUser.userId;
    const roleCheck = decodedUser.role === "customer" ? true : false;
    const roleManagerCheck = decodedUser.role === "shop-manager" ? true : false;

    const { isEmpty } = lodash;

    if (roleManagerCheck) {
      next();
    } else if (roleCheck && isEmpty(req.body)) {
      next();
    } else {
      res
        .status(401)
        .send({ message: "You are not authorized to access this route." });
    }
  } catch (error) {
    return res.status(401).json({
      status: true,
      message: "Your session is not valid",
      data: error,
    });
  }
}
