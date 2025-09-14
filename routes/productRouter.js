import express from 'express';
import { createProduct, deleteProduct , getProductId, getProducts, updateProduct } from '../controller/productController.js';

const productRouter = express.Router();

productRouter.get("/:productId", getProductId)
productRouter.get("/", getProducts)
productRouter.post("/", createProduct)
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct)


export default productRouter;