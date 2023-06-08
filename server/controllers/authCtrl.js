import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const authCtrl = {
  register: async (req, res) => {
    try {
      const {name, email, password} = req.body;
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return res
          .status(400)
          .json({message: "Please enter a valid email address."});
      }
      const user = await User.findOne({email});
      if (user) {
        return res.status(400).json({message: "This email already register."});
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({message: "Password length must be 6 character long."});
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new User({
        name: name.toLowerCase(),
        email,
        password: passwordHash,
      });
      await newUser.save();
      return res.status(201).json({message: "User registration successful!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      if (!email || !password) {
        return res.status(400).json({message: "All fields are required."});
      }
      const foundUser = await User.findOne({account});
      if (!foundUser) {
        return res.status(401).json({message: "This account does not exits."});
      }
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
        return res.status(401).json({message: "Unauthorized"});
      }
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            role: foundUser.role,
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
      );
      const refreshToken = jwt.sign(
        {email: foundUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"}
      );
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/refresh_token",
      });
      return res.json({accessToken});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  refreshToken: async (req, res) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.refreshtoken)
        return res.status(401).json({message: "Unauthorized!"});
      const refreshToken = cookies.refreshtoken;
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) return res.status(403).json({message: "Forbidden"});
          const foundUser = await User.findOne({email: decoded.email}).exec();
          if (!foundUser) {
            return res.status(401).json({message: "Unauthorized"});
          }
          const accessToken = jwt.sign(
            {
              UserInfo: {
                email: foundUser.email,
                role: foundUser.role,
                id: foundUser._id,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
          );
          return res.json({accessToken});
        }
      );
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  logout: async (req, res) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.refreshtoken) return res.sendStatus(204);
      res.clearCookie("refreshtoken", {path: "/api/refresh_token"});
      return res.json({message: "Logged out!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

export default authCtrl;
