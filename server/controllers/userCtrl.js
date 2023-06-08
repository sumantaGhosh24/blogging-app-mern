import User from "../models/userModel.js";

const userCtrl = {
  updateUser: async (req, res) => {
    if (!req.id) {
      return res.status(400).json({message: "Invalid authentication."});
    }
    try {
      const {avatar, name} = req.body;
      await User.findOneAndUpdate(
        {_id: req.user._id},
        {
          avatar,
          name,
        }
      );
      return res.json({message: "User update success!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      return res.json(user);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

export default userCtrl;
