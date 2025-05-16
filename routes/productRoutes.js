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
    image: 'http://localhost:5000/uploads/shirt.jpg',
    category: 'men',
  },
  {
    name: 'Black Suit',
    price: 2500,
    image: 'http://localhost:5000/uploads/men2.jpg',
    category: 'men',
  },
  {
    name: 'Office Attire',
    price: 1500,
    image: 'http://localhost:5000/uploads/men3.jpg',
    category: 'men',
  },
  {
    name: 'Black Kurta',
    price: 700,
    image: 'http://localhost:5000/uploads/men4.jpg',
    category: 'men',
  },
  {
    name: 'Kurta Pajama',
    price: 1200,
    image: 'http://localhost:5000/uploads/men5.jpg',
    category: 'men',
  },
  {
    name: 'Summer Wear',
    price: 2500,
    image: 'http://localhost:5000/uploads/men6.jpg',
    category: 'men',
  },
  {
    name: 'Western Pair',
    price: 2820,
    image: 'http://localhost:5000/uploads/men7.jpg',
    category: 'men',
  },
  {
    name: 'Shorts',
    price: 500,
    image: 'http://localhost:5000/uploads/men8.jpg',
    category: 'men',
  },


  {
    name: 'Golden Dress',
    price: 17500,
    image: 'http://localhost:5000/uploads/women.jpg',
    category: 'women',
  },
  {
    name: 'Black Dress',
    price: 5000,
    image: 'http://localhost:5000/uploads/women2.jpg',
    category: 'women',
  },
  {
    name: 'Green Dress',
    price: 3200,
    image: 'http://localhost:5000/uploads/women3.jpg',
    category: 'women',
  },
  {
    name: 'Cindrela Dress',
    price: 19000,
    image: 'http://localhost:5000/uploads/women4.jpg',
    category: 'women',
  },
  {
    name: 'Red Dress',
    price: 3200,
    image: 'http://localhost:5000/uploads/women5.jpg',
    category: 'women',
  },
  {
    name: 'Lehenga ',
    price: 25000,
    image: 'http://localhost:5000/uploads/women6.jpg',
    category: 'women',
  },
  {
    name: 'Western Fit',
    price: 4575,
    image: 'http://localhost:5000/uploads/women7.jpg',
    category: 'women',
  },
  {
    name: 'Saree',
    price: 4000,
    image: 'http://localhost:5000/uploads/women8.jpg',
    category: 'women',
  },


  {
    name: 'Wrist watch',
    price: 5000,
    image: 'http://localhost:5000/uploads/item1.jpg',
    category: 'accessories',
  },
   {
    name: 'Sneakers',
    price: 7200,
    image: 'http://localhost:5000/uploads/item2.jpg',
    category: 'accessories',
  },
   {
    name: 'Braclet',
    price: 31000,
    image: 'http://localhost:5000/uploads/item3.jpg',
    category: 'accessories',
  },
   {
    name: 'Sunglasses',
    price: 2000,
    image: 'http://localhost:5000/uploads/item4.jpg',
    category: 'accessories',
  },
   {
    name: 'Women Purse',
    price: 4200,
    image: 'http://localhost:5000/uploads/item5.jpg',
    category: 'accessories',
  },
   {
    name: 'Perfume',
    price: 1800,
    image: 'http://localhost:5000/uploads/item6.jpg',
    category: 'accessories',
  },
   {
    name: 'Unisex Belt',
    price: 1200,
    image: 'http://localhost:5000/uploads/item7.jpg',
    category: 'accessories',
  },
   {
    name: 'Women Necklace',
    price: 48000,
    image: 'http://localhost:5000/uploads/item8.jpg',
    category: 'accessories',
  },
  ];

  await Product.insertMany(sampleProducts);
  res.send({ message: 'Seeded successfully' });
});