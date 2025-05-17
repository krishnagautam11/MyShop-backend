import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from './config/db.js';
import { router as productRoutes } from './routes/productRoutes.js';
import { router as authRoutes } from './routes/authRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

const allowedOrigins = [
  'https://my-shop-frontend-nine.vercel.app',
  'https://my-shop-frontend-64sh77uzj-krishna-gautams-projects-4f6e85c9.vercel.app',
  'https://my-shop-frontend-bcn8zi41r-krishna-gautams-projects-4f6e85c9.vercel.app',
  'https://my-shop-frontend-fdh8a7jlr-krishna-gautams-projects-4f6e85c9.vercel.app',
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // Allow REST clients or same-origin
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Your other middleware/routes here
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), {
  setHeaders: (res, path, stat) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
