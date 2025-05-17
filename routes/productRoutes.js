import express from 'express';
import { Product } from '../models/Product.js';

export const router = express.Router();

// Helper to get full image URL based on request info
const getFullImageUrl = (req, imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith('http')) return imagePath; // already a full URL
  return `${req.protocol}://${req.get('host')}/${imagePath}`;
};

// Get all products
router.get('/', async (req, res) => {
  const category = req.query.category;
  const query = category ? { category: category.toLowerCase() } : {};
  const products = await Product.find(query);

  // Map products to include full image URLs
  const productsWithFullImageUrl = products.map(product => ({
    ...product.toObject(),
    image: getFullImageUrl(req, product.image),
  }));

  res.json(productsWithFullImageUrl);
});

// Post a new product
router.post('/', async (req, res) => {
  const { name, price, image } = req.body;
  const product = new Product({ name, price, image });
  await product.save();
  res.status(201).json(product);
});

// TEMP route to seed products
router.post('/seed', async (req, res) => {
  await Product.deleteMany({});
  const sampleProducts = [
    {
      name: 'Black T-Shirt',
      price: 500,
      image: 'uploads/shirt.jpg',
      category: 'men',
    },
    {
      name: 'Black Suit',
      price: 2500,
      image: 'uploads/men9.jpg',
      category: 'men',
    },
    {
      name: 'Office Attire',
      price: 1500,
      image: 'uploads/men3.jpg',
      category: 'men',
    },
    {
      name: 'Black Kurta',
      price: 700,
      image: 'uploads/men4.jpg',
      category: 'men',
    },
    {
      name: 'Kurta Pajama',
      price: 1200,
      image: 'uploads/men5.jpg',
      category: 'men',
    },
    {
      name: 'Summer Wear',
      price: 2500,
      image: 'uploads/men6.jpg',
      category: 'men',
    },
    {
      name: 'Western Pair',
      price: 2820,
      image: 'uploads/men7.jpg',
      category: 'men',
    },
    {
      name: 'Shorts',
      price: 500,
      image: 'uploads/men8.jpg',
      category: 'men',
    },
    {
      name: 'Golden Dress',
      price: 17500,
      image: 'uploads/women.jpg',
      category: 'women',
    },
    {
      name: 'Black Dress',
      price: 5000,
      image: 'uploads/women2.jpg',
      category: 'women',
    },
    {
      name: 'Green Dress',
      price: 3200,
      image: 'uploads/women3.jpg',
      category: 'women',
    },
    {
      name: 'Cindrela Dress',
      price: 19000,
      image: 'uploads/women4.jpg',
      category: 'women',
    },
    {
      name: 'Red Dress',
      price: 3200,
      image: 'uploads/women5.jpg',
      category: 'women',
    },
    {
      name: 'Lehenga',
      price: 25000,
      image: 'uploads/women6.jpg',
      category: 'women',
    },
    {
      name: 'Western Fit',
      price: 4575,
      image: 'uploads/women7.jpg',
      category: 'women',
    },
    {
      name: 'Saree',
      price: 4000,
      image: 'uploads/women8.jpg',
      category: 'women',
    },
    {
      name: 'Wrist watch',
      price: 5000,
      image: 'uploads/item1.jpg',
      category: 'accessories',
    },
    {
      name: 'Sneakers',
      price: 7200,
      image: 'uploads/item2.jpg',
      category: 'accessories',
    },
    {
      name: 'Braclet',
      price: 31000,
      image: 'uploads/item3.jpg',
      category: 'accessories',
    },
    {
      name: 'Sunglasses',
      price: 2000,
      image: 'uploads/item4.jpg',
      category: 'accessories',
    },
    {
      name: 'Women Purse',
      price: 4200,
      image: 'uploads/item5.jpg',
      category: 'accessories',
    },
    {
      name: 'Perfume',
      price: 1800,
      image: 'uploads/item6.jpg',
      category: 'accessories',
    },
    {
      name: 'Unisex Belt',
      price: 1200,
      image: 'uploads/item7.jpg',
      category: 'accessories',
    },
    {
      name: 'Women Necklace',
      price: 48000,
      image: 'uploads/item8.jpg',
      category: 'accessories',
    },
  ];

  await Product.insertMany(sampleProducts);
  res.send({ message: 'Seeded successfully' });
});

// Delete all products
router.delete('/clear', async (req, res) => {
  await Product.deleteMany({});
  res.send({ message: 'All products deleted' });
});
