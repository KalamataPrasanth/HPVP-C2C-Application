import Wishlist from "../models/wishlist.model.js";
import mongoose from "mongoose";

// Add an item to Wishlist
export const addWishlistItem = async (req, res) => {
    const { name, description, priceRange } = req.body;

    if (!name || !description || !priceRange) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const newWishlistItem = new Wishlist({ name, description, priceRange, staffno: req.user.staffno });
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

// Get wishlist items for the logged-in user
export const getMyWishlistItems = async (req, res) => {
    try {
        const staffno = req.user.staffno;
        const myWishlistItems = await Wishlist.find({ staffno });

        res.status(200).json({ success: true, data: myWishlistItems });
    } catch (error) {
        console.error("Error fetching user's wishlist items", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete a Wishlist item
export const deleteWishlistItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Wishlist item not found" });
    }

    try {
        
        const item = await Wishlist.findById(id);
        if(!item){
            return res.status(400).json({success: false, message: "Wishlist item not found" });
        }

        if (item.staffno != req.user.staffno){
            return res.status(403).json({success: false, message: "Unauthorized: Not your wishlist item"});
        }

        await Wishlist.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Wishlist item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
