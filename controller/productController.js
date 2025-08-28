import Product from "../models/product.js";
import productRouter from "../routes/productRouter.js";
import { isAdmin } from "./userController.js";

export  async function createProduct(req,res){

if (!isAdmin(req)) {
    
     res.status(403).json({
            message :"your are not authorized to create  a product"
        });
        return;
}

    try {
        
     const productData = req.body;

     const product = new Product(productData)

     await product.save()

     res.json(
        {
            message : "product create successfull",
            product : product
        }
     );

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message : "Faild to create product"
        })
    }
    
}

export async function getProducts(req, res) {
    console.log("fetching all product")
    try {

    const products = await Product.find();
    res.json(products);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({

            message : "Faild  to retrieve products",
        });
    }

}


export async function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to delete a product"
        });
        return;
    }

    try {
        const productId = req.params.productId; 



        // Find the product first
        const product = await Product.findOne({ productId });

        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }

        // Then delete it
        await Product.deleteOne({ productId });

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete product"
        });
    }
}


export async function updateProduct(req,res) {
    
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to delete a product"
        });
        return;
    }

    try {
        
        const productId = req.params.productId; 
        const updateData = req.body;
        await Product.updateOne(
            {productId : productId},
            updateData
        );
        res.json({
            message : "update succesfully product"
        })

    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update product"
        });
    }

}

export async function getProductId(req,res) {
    
    try {
        
        const productid = req.params.productId;
        const product =  await Product.findOne(
            {
                productId : productid
            }  
        )

        if(product == null){
            res.status(404).json({
                message :"product not found"
            })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({

            message : "Faild  to retrieve products",
        });
    }
}