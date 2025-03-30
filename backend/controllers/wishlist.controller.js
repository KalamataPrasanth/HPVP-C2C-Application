import Wishlist from "../models/wishlist.model.js";
import mongoose from "mongoose";

// Add an item to Wishlist
export const addWishlistItem = async (req, res) => {
    const { name, description, priceRange } = req.body;

    if (!name || !description || !priceRange) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const newWishlistItem = new Wishlist({ name, description, priceRange });
        await newWishlistItem.save();
        res.status(201).json({ success: true, data: newWishlistItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get all Wishlist items
export const getWishlistItems = async (req, res) => {
    try {
        const wishlistItems = await Wishlist.find({});
        res.status(200).json({ success: true, data: wishlistItems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a Wishlist item
export const deleteWishlistItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Wishlist item not found" });
    }

    try {
        await Wishlist.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Wishlist item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
