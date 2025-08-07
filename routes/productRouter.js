import express from 'express';
import { createProduct, deleteProduct , getProductId, getProducts, updateProduct } from '../controller/productController.js';

const productRouter = express.Router();

productRouter.get("/", getProducts)
productRouter.post("/", createProduct)
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct)
productRouter.get("/:productId", getProductId)

export default productRouter;