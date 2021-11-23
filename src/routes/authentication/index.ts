import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../../models/User";

import express from "express";

const auth = express.Router();

auth.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name, role } = req.body;

      const user = await User.create({ email, password, name, role });
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.send({ token });
    } catch (error) {
      next(error);
    }
  }
);

export default auth;
