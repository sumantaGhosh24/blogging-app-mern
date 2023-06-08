import express from "express";

import categoryCtrl from "../controllers/categoryCtrl.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(authAdmin, categoryCtrl.createCategory);

router
  .route("/category/:id")
  .patch(authAdmin, categoryCtrl.updateCategory)
  .delete(authAdmin, categoryCtrl.deleteCategory);

export default router;
