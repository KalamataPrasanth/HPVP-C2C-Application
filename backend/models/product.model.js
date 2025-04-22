import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics and Appliances', 'Vehicles', 'Real Estate', 'Furniture and Home Decor', 'Fashion and Accessories', 'Stationary', 'Books', 'Sports and Hobbies', 'Tools and Machinery', 'Jobs, Services and Software']
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;