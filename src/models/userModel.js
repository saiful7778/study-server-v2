import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String, required: [true, "User name is required"] },
    userEmail: { type: String, required: [true, "User email is required"] },
    userPhoto: String,
    userToken: { type: String, required: [true, "User token is required"] },
    userRole: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    userBadge: { type: String, enum: ["bronze", "gold"], default: "bronze" },
  },
  { timestamps: true }
);

export const userModel = model("user", userSchema);
