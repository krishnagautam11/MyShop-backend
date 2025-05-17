import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from './config/db.js';
import { router as productRoutes } from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

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
  'https://my-shop-frontend-2ywea2gvp-krishna-gautams-projects-4f6e85c9.vercel.app'
];

// Manual CORS middleware to fix wildcard '*' issue with credentials
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  // Handle OPTIONS preflight requests quickly
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

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
  console.log(`server is running on port ${PORT}`);
});
