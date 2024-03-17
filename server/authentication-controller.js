const jwt = require("jsonwebtoken");
const authModel = require("./authentication-model");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const my_secret_key = process.env.secret_key;

const handleRegisterUser = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  if (!userName || !userEmail || !userPassword) {
    return res
      .status(400)
      .send({ message: "Entering all field is mandatory", success: false });
  }
  try {
    let regResponse = await authModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (regResponse) {
      return res
        .status(409)
        .send({ message: "User already exists", success: false });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const password = req.body.userPassword;
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newResponse = await new authModel({
        userName,
        userEmail,
        userPassword: hashedPassword,
      });
      const savedUser = await newResponse.save({
        userName,
        userEmail,
        userPassword: hashedPassword,
      });
      const userDetails = {
        userName: savedUser.userName,
        userEmail: savedUser.userEmail,
      };
      return res.status(201).send({
        message: "Successfully done the registration",
        success: true,
        userDetails,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Could not process the request", success: false });
  }
};

const handleUserLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  if (!userEmail || !userPassword) {
    {
      return res
        .status(400)
        .send({ message: "Entering all fields is mandatory", success: false });
    }
  }
  try {
    let comparisonOutput;
    let loginResponse = await authModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (!loginResponse) {
      return res.status(404).send({ message: "Invalid email", success: false });
    }
    comparisonOutput = await bcryptjs.compare(
      userPassword,
      loginResponse.userPassword
    );
    if (!comparisonOutput) {
      return res
        .status(406)
        .send({ message: "Invalid credentials", success: false });
    } else {
      const token = jwt.sign({ id: comparisonOutput._id }, my_secret_key, {
        expiresIn: "1d",
      });
      const loginCookie = {
        _id: comparisonOutput._id,
        email: comparisonOutput.email,
      };
      res.cookie(loginCookie);
      return res
        .status(201)
        .send({ message: "Login successfull", success: true, token });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Unable to process the request", success: false });
  }
};

const express = require("express");
const registerRouter = express.Router();
const loginRouter = express.Router();

registerRouter.post("/register-user", handleRegisterUser);
loginRouter.post("/login-user", handleUserLogin);

module.exports = {
  registerRouter: registerRouter,
  loginRouter: loginRouter,
};
