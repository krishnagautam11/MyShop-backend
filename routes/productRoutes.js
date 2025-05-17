import express from 'express';
import { Product } from '../models/Product.js';

export const router = express.Router();

//getting all products
router.get('/', async (req,res)=>{
    const category = req.query.category;
    const query = category ? {category:category.toLowerCase()} : {};
    const products = await Product.find(query);
    res.json(products);
});

//post a new product
router.post('/', async (req,res)=>{
    const {name,price, image} = req.body;
    const product = new Product({name ,price, image});
    await product.save();
    res.status(201).json(product);
})

// TEMP route to seed products
router.post('/seed', async (req, res) => {
      await Product.deleteMany({});
  const sampleProducts = [
   {
    name: 'Black T-Shirt ',
    price: 500,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/shirt.jpg',
    category: 'men',
  },
  {
    name: 'Black Suit',
    price: 2500,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/men2.jpg',
    category: 'men',
  },
  {
    name: 'Office Attire',
    price: 1500,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/men3.jpg',
    category: 'men',
  },
  {
    name: 'Black Kurta',
    price: 700,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/men4.jpg',
    category: 'men',
  },
  {
    name: 'Kurta Pajama',
    price: 1200,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/men5.jpg',
    category: 'men',
  },
  {
    name: 'Summer Wear',
    price: 2500,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/men6.jpg',
    category: 'men',
  },
  {
    name: 'Western Pair',
    price: 2820,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/men7.jpg',
    category: 'men',
  },
  {
    name: 'Shorts',
    price: 500,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/men8.jpg',
    category: 'men',
  },


  {
    name: 'Golden Dress',
    price: 17500,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/women.jpg',
    category: 'women',
  },
  {
    name: 'Black Dress',
    price: 5000,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/women2.jpg',
    category: 'women',
  },
  {
    name: 'Green Dress',
    price: 3200,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/women3.jpg',
    category: 'women',
  },
  {
    name: 'Cindrela Dress',
    price: 19000,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/women4.jpg',
    category: 'women',
  },
  {
    name: 'Red Dress',
    price: 3200,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/women5.jpg',
    category: 'women',
  },
  {
    name: 'Lehenga ',
    price: 25000,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/women6.jpg',
    category: 'women',
  },
  {
    name: 'Western Fit',
    price: 4575,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/women7.jpg',
    category: 'women',
  },
  {
    name: 'Saree',
    price: 4000,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/women8.jpg',
    category: 'women',
  },


  {
    name: 'Wrist watch',
    price: 5000,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/item1.jpg',
    category: 'accessories',
  },
   {
    name: 'Sneakers',
    price: 7200,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/item2.jpg',
    category: 'accessories',
  },
   {
    name: 'Braclet',
    price: 31000,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/item3.jpg',
    category: 'accessories',
  },
   {
    name: 'Sunglasses',
    price: 2000,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/item4.jpg',
    category: 'accessories',
  },
   {
    name: 'Women Purse',
    price: 4200,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/item5.jpg',
    category: 'accessories',
  },
   {
    name: 'Perfume',
    price: 1800,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/item6.jpg',
    category: 'accessories',
  },
   {
    name: 'Unisex Belt',
    price: 1200,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/item7.jpg',
    category: 'accessories',
  },
   {
    name: 'Women Necklace',
    price: 48000,
    image: 'https://myshop-backend-production1.up.railway.app/uploads/item8.jpg',
    category: 'accessories',
  },
  ];

  await Product.insertMany(sampleProducts);
  res.send({ message: 'Seeded successfully' });
});