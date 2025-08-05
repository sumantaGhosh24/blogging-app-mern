import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    title: {type: String, required: true, trim: true},
    content: {type: String, required: true},
    description: {type: String, required: true, trim: true},
    thumbnail: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

blogSchema.index({title: "text"});

export default mongoose.model("blog", blogSchema);
