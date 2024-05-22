import { userModel } from "../models/userModel.js";
import devDebug from "../utils/dev-debug.js";

export default async function verifyUserID(req, res, next) {
  const userId = req.query?.userId;
  if (!userId) {
    res.status(401).send({ success: false, message: "Unauthorized" });
    devDebug("userId is unavailable");
    return;
  }

  try {
    const existUser = await userModel.findById(userId, { _id: 1 });
    if (!existUser) {
      res.status(401).send({ success: false, message: "Unauthorized" });
      devDebug("User doesn't exist");
      return;
    }
    req.userId = userId;
    next();
  } catch {
    res.status(401).send({ success: false, message: "Unauthorized" });
    devDebug("User query catch error in verifyUserID middleware");
    return;
  }
}
