import express from "express";
import { 
    addWishlistItem, 
    getWishlistItems, 
    deleteWishlistItem 
} from "../controllers/wishlist.controller.js";

const router = express.Router();

//add an item to the wishlist
router.post("/", addWishlistItem);

//get all wishlist items
router.get("/", getWishlistItems);

//delete a wishlist item
router.delete("/:id", deleteWishlistItem);

export default router;
