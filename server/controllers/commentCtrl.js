import Comments from "../models/commentModel.js";

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const {content, blog, blog_user_id} = req.body;
      const newComment = new Comments({
        user: req.id,
        content,
        blog_id: blog,
        blog_user_id,
      });
      await newComment.save();
      return res.json({message: "New comment created!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getComments: async (req, res) => {
    try {
      const comments = await Comments.find({
        blog_id: req.params.id,
      }).populate("user", "-password");
      return res.json(comments);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

export default commentCtrl;
