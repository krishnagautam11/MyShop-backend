import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { connectDB } from './config/db.js';
import { router as productRoutes } from './routes/productRoutes.js';
import { router as authRoutes } from './routes/authRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
  'https://my-shop-frontend-nine.vercel.app',
  'https://my-shop-frontend-bcn8zi41r-krishna-gautams-projects-4f6e85c9.vercel.app',
  'https://my-shop-frontend-fdh8a7jlr-krishna-gautams-projects-4f6e85c9.vercel.app',
  'https://my-shop-frontend-2ywea2gvp-krishna-gautams-projects-4f6e85c9.vercel.app',
];

// Use cors middleware with dynamic origin and credentials support
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow REST clients like curl, postman with no origin
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Handle OPTIONS preflight requests for all routes
app.options('*', cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
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

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
