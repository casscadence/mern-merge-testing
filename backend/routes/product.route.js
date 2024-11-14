import express from "express";

import { createProduct, getProducts, updateProduct, deleteProduct, addCart, getCart, updateCart, removeCart } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.post("/cart", addCart);
router.get("/cart", getCart);
router.put("/cart/:id", updateCart);
router.delete("/cart/:id", removeCart);

export default router;