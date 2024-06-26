import { Router } from "express";
import serverHelper from "../utils/server-helper.js";
import { userModel } from "../models/userModel.js";
import inputCheck from "../utils/input-check.js";
import devDebug from "../utils/dev-debug.js";
import verifyToken from "../middleware/verifyToken.js";
import verifyTokenAndKey from "../middleware/verifyTokenKey.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const route = Router();
const routeAll = Router();

// user create route
route.post("/", (req, res) => {
  const { userName, userEmail, userPhoto, userToken } = req.body;

  const check = inputCheck([userName, userEmail, userToken], res);
  if (!check) {
    return;
  }
  serverHelper(async () => {
    const existUser = await userModel.findOne({ userEmail }, { _id: 1 });
    if (existUser) {
      res
        .status(400)
        .send({ success: false, message: "user is already exist" });
      devDebug("user is already exist");
      return;
    }

    await userModel.create({ userName, userEmail, userToken, userPhoto });
    devDebug("new user created");
    res.status(201).send({
      success: true,
      message: "User is created",
    });
  }, res);
});

// OAuth user create route
route.post("/oauth", (req, res) => {
  const { userName, userEmail, userPhoto, userToken } = req.body;

  const check = inputCheck([userName, userEmail, userToken], res);
  if (!check) {
    return;
  }
  serverHelper(async () => {
    const existUser = await userModel.findOne({ userEmail }, { _id: 1 });
    if (existUser) {
      res.status(200).send({ success: true, message: "user is already exist" });
      devDebug("user is already exist in oauth");
      return;
    }

    await userModel.create({ userName, userEmail, userToken, userPhoto });
    devDebug("new user created is oauth");
    res.status(201).send({
      success: true,
      message: "User is created",
    });
  }, res);
});

// get single user data route
route.get("/:userId", verifyToken, verifyTokenAndKey, (req, res) => {
  const userId = req.params.userId;
  serverHelper(async () => {
    const existUser = await userModel.findById(userId, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!existUser) {
      res.status(404).send({
        success: false,
        message: "User not exist",
      });
      return;
    }

    res.status(200).send({
      success: true,
      data: existUser,
    });
  }, res);
});

route.patch("/:userId", verifyToken, verifyTokenAndKey, (req, res) => {
  const userId = req.params.userId;
  const reqData = req.body;
  serverHelper(async () => {
    const existUser = await userModel.findById(userId, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!existUser) {
      res.status(404).send({
        success: false,
        message: "User not exist",
      });
      return;
    }

    const data = await userModel.updateOne({ _id: userId }, reqData);

    res.status(200).send({
      success: true,
      data,
    });
  }, res);
});

// get all user data (admin)
routeAll.get("/", verifyToken, verifyTokenAndKey, verifyAdmin, (req, res) => {
  serverHelper(async () => {
    const data = await userModel.find({}, { __v: 0 });

    res.status(200).send({
      success: true,
      data,
    });
  }, res);
});

export default routeAll;
export { route as userRoute };
