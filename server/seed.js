import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import {faker} from "@faker-js/faker";

import User from "./models/userModel.js";
import Category from "./models/categoryModel.js";
import Blog from "./models/blogModel.js";
import Comment from "./models/commentModel.js";
import connectDB from "./lib/connectDB";

dotenv.config();

connectDB();

const seedDB = async () => {
  try {
    console.log("Database seeding started...");

    console.log("Creating admin...");
    const admin = new User({
      name: "test admin",
      email: faker.internet
        .email({firstName: "test", lastName: "admin"})
        .toLowerCase(),
      password: await bcrypt.hash("test@admin", 10),
      avatar:
        "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1753507657/accommodation-booking/tmp-1-1753507651178_azu5rk.jpg",
      role: "admin",
    });
    await admin.save();
    console.log("Created admin.");

    console.log("Seeding users...");
    const users = [];
    for (let i = 0; i < 5; i++) {
      const firstName = faker.person.firstName().toLowerCase();
      const lastName = faker.person.lastName().toLowerCase();
      const user = new User({
        name: firstName + lastName,
        email: faker.internet.email({firstName, lastName}).toLowerCase(),
        password: await bcrypt.hash(firstName, 10),
        avatar:
          "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1753507657/accommodation-booking/tmp-1-1753507651178_azu5rk.jpg",
        role: "user",
      });
      users.push(await user.save());
    }
    console.log(`Seeded ${users.length} users.`);

    console.log("Seeding categories...");
    const categories = [];
    const categoryNames = [
      "Technology",
      "AI",
      "Developer",
      "Design",
      "Food",
      "Travel",
      "Commerce",
      "Business",
    ];
    for (let i = 0; i < 10; i++) {
      const name =
        categoryNames[i] || faker.lorem.word({length: {min: 5, max: 10}});
      const category = new Category({
        name: name,
      });
      categories.push(await category.save());
    }
    console.log(`Seeded ${categories.length} categories.`);

    console.log("Seeding blogs...");
    const blogs = [];
    for (let i = 0; i < 100; i++) {
      const randomCategory = faker.helpers.arrayElement(categories);
      const randomUser = faker.helpers.arrayElement(users);
      const blog = new Blog({
        user: randomUser._id,
        category: randomCategory._id,
        title: faker.lorem.paragraph(),
        description: faker.lorem.paragraphs(2),
        content: faker.lorem.paragraphs(4),
        thumbnail:
          "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1753507657/accommodation-booking/tmp-1-1753507651178_azu5rk.jpg",
      });
      blogs.push(await blog.save());
    }
    console.log(`Seeded ${blogs.length} blogs.`);

    console.log("Seeding comments...");
    const comments = [];
    for (let i = 0; i < 300; i++) {
      const randomBlog = faker.helpers.arrayElement(blogs);
      const randomUser = faker.helpers.arrayElement(users);
      const comment = new Comment({
        user: randomUser._id,
        blog_id: randomBlog._id,
        blog_user_id: randomBlog.user,
        content: faker.lorem.sentence(),
      });
      comments.push(await comment.save());
    }
    console.log(`Seeded ${comments.length} comments.`);

    console.log("Database seeding complete!");
  } catch (error) {
    console.log(error);
  }
};

seedDB();
