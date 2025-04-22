import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priceRange: {
        type: String,
        required: true
    },
    staffno: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
export default Wishlist;