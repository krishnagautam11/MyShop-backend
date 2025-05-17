import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from './config/db.js';
import { router as productRoutes } from './routes/productRoutes.js';
import { router as authRoutes } from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// ES Modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS
const allowedOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : [
      'https://my-shop-frontend-nine.vercel.app',
      'https://my-shop-frontend-*-krishna-gautams-projects-4f6e85c9.vercel.app',
      'http://localhost:3000'
    ];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests globally
app.options('*', cors(corsOptions));

// Static files with proper CORS headers
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), {
  setHeaders: (res) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Basic route
app.get('/', (req, res) => {
  res.send(`
    <h1>E-commerce API</h1>
    <p>Server is running</p>
    <ul>
      <li><a href="/health">Health Check</a></li>
      <li><a href="/api/products">Products API</a></li>
    </ul>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle CORS errors specifically
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      error: 'CORS Policy: Access Not Allowed',
      requestedOrigin: req.headers.origin,
      allowedOrigins
    });
  }

  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
    Server running in ${process.env.NODE_ENV || 'development'} mode
    Listening on port ${PORT}
    Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}
    CORS Allowed Origins: ${allowedOrigins.join(', ')}
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.stack}`);
  server.close(() => process.exit(1));
});

export default app;