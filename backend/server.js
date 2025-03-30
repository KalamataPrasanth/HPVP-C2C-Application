import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';
import wishlistRoutes from './routes/wishlist.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.startsWith("http://localhost")){
            callback(null, "http://localhost:5173");
        }else{
            try {
                const hostname = new URL(origin).hostname;
                callback(null, `http://${hostname}:5173`);
            } catch (error) {
                callback(new Error("Not allowed by CORS"));
            }
        }
    },
    credentials: true
}));
app.use('/uploads', express.static('uploads'));

//landing page
app.get('/', (req, res) => {
    res.send('Server is ready');
});

//routes
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/auth', authRoutes);

//connecting to local mongoDB
app.listen(PORT, '0.0.0.0', () => {
    connectDB();
    console.log('Server listening at port '+PORT);
});