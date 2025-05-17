import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
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

app.use(express.json());

// CORS middleware with logging and allowed origins list
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://my-shop-frontend-nine.vercel.app',
    'https://my-shop-frontend-64sh77uzj-krishna-gautams-projects-4f6e85c9.vercel.app',
    'https://my-shop-frontend-bcn8zi41r-krishna-gautams-projects-4f6e85c9.vercel.app',
    'https://my-shop-frontend-fdh8a7jlr-krishna-gautams-projects-4f6e85c9.vercel.app',
  ];

  const origin = req.headers.origin;
  console.log('CORS middleware origin:', origin);

  if (allowedOrigins.includes(origin)) {
    console.log('Allowed origin:', origin);
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  } else {
    console.log('Origin not allowed:', origin);
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  next();
});

// Serve uploads with CORS header
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), {
  setHeaders: (res, path, stat) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// Routes — important: after CORS middleware
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
