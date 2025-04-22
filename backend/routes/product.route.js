import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, getMyProducts } from '../controllers/product.controller.js';
import upload from '../middleware/upload.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

//create product
router.post('/',authMiddleware, upload.single('image'), createProduct);

//get all products
router.get('/', getProducts);

//get products by logged in user
router.get('/myproducts', authMiddleware, getMyProducts);

//get product by id
router.get('/:id', getProductById);

//update a product - put method [update all the fields]
router.put('/:id',authMiddleware, upload.single('image'), updateProduct);

//delete product by Id
router.delete("/:id",authMiddleware, deleteProduct);


export default router