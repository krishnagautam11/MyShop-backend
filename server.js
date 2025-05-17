import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import {connectDB} from './config/db.js';
import {router as productRoutes} from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: 'https://my-shop-frontend-4r3lt2mqg-krishna-gautams-projects-4f6e85c9c.vercel.app',
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), {
  setHeaders: (res, path, stat) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running`);
});