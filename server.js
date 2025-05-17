import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from './config/db.js';
import { router as productRoutes } from './routes/productRoutes.js';
import { router as authRoutes } from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cookieParser());

// Minimal CORS setup for your frontend URL only
app.use(cors({
  origin: 'https://my-shop-frontend-6qalp67wd-krishna-gautams-projects-4f6e85c9.vercel.app',
  credentials: true,
}));
app.options('*', cors());

// Serve uploads folder statically
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
