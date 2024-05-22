import express from "express";
import cors from "cors";
import usersRoute, { userRoute } from "./src/routes/user.js";
import getEnvVar from "./src/utils/env-var.js";
import { connect } from "mongoose";
import { authenticationRoute } from "./src/routes/authentication.js";

const app = express();

const port = process.env.PORT ?? 5000;

const dbUrl = getEnvVar("DB_CONNECT");

(async () => {
  try {
    console.log("connecting...");
    await connect(dbUrl);
    console.log("connected DB");
  } catch (err) {
    console.log("connection failed");
    console.log(err);
  }
})();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Server is running",
  });
});

app.use("/user", userRoute);
app.use("/users", usersRoute);
app.use("/authentication", authenticationRoute);

app.listen(port, () => {
  console.log("server is running on port:", port);
});
