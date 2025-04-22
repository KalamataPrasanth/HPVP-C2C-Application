import Product from "../models/product.model.js";
import Employee from "../models/Employee.js";
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

//create a product
export const createProduct = async (req, res)=> {

    console.log("$#$ Received Date: ", req.body);
    console.log("$#$ Received file: ", req.file);

    const { name, price, description, category} = req.body
    if (!name || !price || !description || !category){
        return res.status(400).json({success: false, message: "Please provide all fields including seller"});
    }

    if (!req.file){
        return res.status(400).json({ success: false, message: "Please upload an image. "});
    }

    try{
        const validSeller = await Employee.findOne({staffno: req.user.staffno});
        if (!validSeller){
            return res.status(400).json({success: false, message: "Invalid Seller, Employee does not exist."});
        }

        const newProduct = new Product({ 
            name, price, description, category, 
            seller: validSeller._id,
            image: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        });

        await newProduct.save();
        console.log("$#$ Product Saved Successfully", newProduct);
        res.status(201).json({success: true, data: newProduct});
    }catch(error){
        console.error("$#$ Error Saving Product: ", error);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

//get all products
export const getProducts = async (req, res)=> {
    try{
        const query = {};
        if (req.query.category){
            query.category = req.query.category;
        }
        const products = await Product.find(query).populate('seller', '-password');
        res.status(200).json({success: true, data: products});
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
};

//get product by id
export const getProductById = async (req, res) =>{
    const {id} = req.params;
    try{
        const product = await Product.findById(id).populate('seller', '-password');
        if (!product){
            return res.status(404).json({success: false, message: "Product Not found"});
        }
        res.status(200).json({success: true, data: product});
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
};

//get products by logged-in user
export const getMyProducts = async (req, res) => {
    try {
        const employee = await Employee.findOne({ staffno: req.user.staffno });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const myProducts = await Product.find({ seller: employee._id }).populate('seller', '-password');

        res.status(200).json({ success: true, data: myProducts });
    } catch (error) {
        console.error("Error fetching user products:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


//update product
export const updateProduct = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Product not found"});
    }

    try{
        const product = await Product.findById(id);
        if (!product){
            return res.status(404).json({success: false, message: "Product not Found"});
        }

        if (String(product.seller) !== String(req.user._id)){
            return res.status(403).json({success: false, message: "Unauthorized: Not your product"});
        }

        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.description = req.body.description || product.description;
        if(req.file){

            if (product.image) {
                const oldImagePath = path.join('uploads', path.basename(new URL(product.image).pathname));
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Error deleting old image:", err);
                    } else {
                        console.log("Old image deleted:", oldImagePath);
                    }
                });
            }

            product.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const updatedProduct = await product.save();
        res.status(200).json({success: true, data: updatedProduct});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

//delete product
export const deleteProduct = async (req, res) => {
    const {id} = req.params
    try{
        const product = await Product.findById(id);
        if (!product){
            return res.status(404).json({message: "Product Not found"});
        }

        if (String(product.seller) !== String(req.user._id)){
            return res.status(403).json({success: false, message: "Unauthorized: Not your product"});
        }

        if (product.image) {
            const imagePath = path.join('uploads', path.basename(new URL(product.image).pathname));
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image:", err);
                } else {
                    console.log("Product image deleted:", imagePath);
                }
            });
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({message: "Product deleted successfully"});
    }catch(error){
        res.status(500).json({message: error.message})
    }
};