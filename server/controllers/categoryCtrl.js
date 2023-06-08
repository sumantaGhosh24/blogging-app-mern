import Category from "../models/categoryModel.js";
import Blog from "../models/blogModel.js";

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find().sort("-createdAt");
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createCategory: async (req, res) => {
    try {
      const name = req.body.name.toLowerCase();
      const category = await Category.findOne({name});
      if (category) {
        return res
          .status(400)
          .json({message: "This category already created."});
      }
      const newCategory = new Category({name});
      await newCategory.save();
      return res.json({message: "Category created."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  updateCategory: async (req, res) => {
    try {
      await Category.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {name: req.body.name.toLowerCase()}
      );
      return res.json({message: "Category updated successful!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const blog = await Blog.findOne({category: req.params.id});
      if (blog) {
        return res.status(400).json({
          message:
            "Before deleting this category please delete all blog of this category.",
        });
      }
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(400).json({message: "Category does not exists."});
      }
      return res.json({message: "Category deleted!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

export default categoryCtrl;
