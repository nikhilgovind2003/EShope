import express from "express";
const router = express.Router();
import {upload} from "../middleWares/middleWare.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/Product.Controller.js";

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch("/:id",upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
