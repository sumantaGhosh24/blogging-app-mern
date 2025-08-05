import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true},
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
    },
    role: {type: String, default: "user"},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
