import mongoose, { mongo } from 'mongoose';

export const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    image: {type:String},
    price: {type:Number, required:true},
    category: {type:String},
});

export const Product = mongoose.model('Product', productSchema);
