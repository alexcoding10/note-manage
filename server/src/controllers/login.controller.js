import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
      if(!user) {
        return res.status(400).json({
          status: "400",
          message: "Invalid Credentials"
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if(!validPassword) {
        return res.status(400).json({
          status: "400",
          message: "Invalid Credentials"
        });
      }

      // Generate JWT
      const token = jwt.sign( user.toJSON(),process.env.SECRET_KEY,{ expiresIn: '1h' })

      // Return JWT
      res.status(200).json({
        status: "200",
        message: "Login Successful",
        token: token
      });

    }catch (err){
      console.log(err);
      return res.status(500).json({
        status: "500",
        message: "Internal Server Error"
      });
    }
}