import express from "express";
import { 
    addWishlistItem, 
    getWishlistItems, 
    getMyWishlistItems,
    deleteWishlistItem 
} from "../controllers/wishlist.controller.js";
import authMiddleWare from '../middleware/auth.middleware.js';

const router = express.Router();

//add an item to the wishlist
router.post("/", authMiddleWare, addWishlistItem);

//get all wishlist items
router.get("/", getWishlistItems);

//get logged-in-user items
router.get("/mywishlist", authMiddleWare, getMyWishlistItems);

//delete a wishlist item
router.delete("/:id",authMiddleWare, deleteWishlistItem);

export default router;
