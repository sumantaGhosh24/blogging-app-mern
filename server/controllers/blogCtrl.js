import mongoose from "mongoose";

import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

const Pagination = (req) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;
  return {page, limit, skip};
};

const blogCtrl = {
  createBlog: async (req, res) => {
    try {
      const {title, content, description, thumbnail, category} = req.body;
      const newBlog = new Blog({
        user: req.user._id,
        title: title.toLowerCase(),
        content,
        description,
        thumbnail,
        category,
      });
      await newBlog.save();
      return res.json({message: "Blog created!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getHomeBlogs: async (req, res) => {
    try {
      const blogs = await Blog.aggregate([
        {
          $lookup: {
            from: "users",
            let: {user_id: "$user"},
            pipeline: [
              {$match: {$expr: {$eq: ["$_id", "$$user_id"]}}},
              {$project: {password: 0}},
            ],
            as: "user",
          },
        },
        {$unwind: "$user"},
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {$unwind: "$category"},
        {$sort: {createdAt: -1}},
        {
          $group: {
            _id: "$category._id",
            name: {$first: "$category.name"},
            blogs: {$push: "$$ROOT"},
            count: {$sum: 1},
          },
        },
        {
          $project: {
            blogs: {
              $slice: ["$blogs", 0, 4],
            },
            count: 1,
            name: 1,
          },
        },
      ]);
      return res.json(blogs);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getBlogsByCategory: async (req, res) => {
    const {limit, skip} = Pagination(req);
    try {
      const Data = await Blog.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.id),
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: {user_id: "$user"},
                  pipeline: [
                    {$match: {$expr: {$eq: ["$_id", "$$user_id"]}}},
                    {$project: {password: 0}},
                  ],
                  as: "user",
                },
              },
              {$unwind: "$user"},
              {$sort: {createdAt: -1}},
              {$skip: skip},
              {$limit: limit},
            ],
            totalCount: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.id),
                },
              },
              {$count: "count"},
            ],
          },
        },
        {
          $project: {
            count: {$arrayElemAt: ["$totalCount.count", 0]},
            totalData: 1,
          },
        },
      ]);
      const blogs = Data[0].totalData;
      const count = Data[0].count;
      let total = 0;
      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }
      return res.json({blogs, total});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getBlogsByUser: async (req, res) => {
    const {limit, skip} = Pagination(req);
    try {
      const Data = await Blog.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.params.id),
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: {user_id: "$user"},
                  pipeline: [
                    {$match: {$expr: {$eq: ["$_id", "$$user_id"]}}},
                    {$project: {password: 0}},
                  ],
                  as: "user",
                },
              },
              {$unwind: "$user"},
              {$sort: {createdAt: -1}},
              {$skip: skip},
              {$limit: limit},
            ],
            totalCount: [
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.params.id),
                },
              },
              {$count: "count"},
            ],
          },
        },
        {
          $project: {
            count: {$arrayElemAt: ["$totalCount.count", 0]},
            totalData: 1,
          },
        },
      ]);
      const blogs = Data[0].totalData;
      const count = Data[0].count;
      let total = 0;
      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }
      return res.json({blogs, total});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getBlog: async (req, res) => {
    try {
      const blog = await Blog.findOne({_id: req.params.id}).populate(
        "user",
        "-password"
      );
      if (!blog) return res.status(400).json({message: "Blog does not exist."});
      return res.json(blog);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  updateBlog: async (req, res) => {
    try {
      const blog = await Blog.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        req.body
      );
      if (!blog)
        return res.status(400).json({message: "This blog is not exists."});
      return res.json({message: "Blog updated!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      if (!blog)
        return res.status(400).json({message: "This blog is not exists."});
      await Comment.deleteMany({blog_id: blog._id});
      return res.json({message: "Blog deleted!"});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  searchBlogs: async (req, res) => {
    try {
      const blogs = await Blog.aggregate([
        {
          $search: {
            index: "searchTitle",
            autocomplete: {
              query: `${req.query.title}`,
              path: "title",
            },
          },
        },
        {$sort: {createdAt: -1}},
        {$limit: 5},
        {
          $project: {
            title: 1,
            description: 1,
            thumbnail: 1,
            createdAt: 1,
          },
        },
      ]);
      if (!blogs.length)
        return res.status(400).json({message: "No blog found."});
      return res.json(blogs);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

export default blogCtrl;
