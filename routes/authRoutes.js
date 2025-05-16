import express from 'express';
import {User} from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

//register
router.post('/register', async (req,res)=>{
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);

    try{
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    }catch(err){
        res.status(400).json({error: 'email already exsits or invalid data'});
    }
});

//login
router.post('/login', async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({error : 'Invalid Credentials'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).json({error : 'Invalid Crendentials'});
    res.json({message: 'Login successful'});
});

export default router;