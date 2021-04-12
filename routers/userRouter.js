import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AuthModel from '../models/authModels.js';
import UserModel from '../models/authModels.js';
import auth from '../middleware/auth.js';
import sendMail from './sendMail.js';
import {google} from 'googleapis';
const {OAuth2} = google.auth;
const router = express.Router();

const {CLIENT_URL} = process.env;

const client = new OAuth2(process.env.CLIENT_ID);
//register
router.post('/register', async(req,res)=>{
    try{
        const {name,email,password,passwordVerify} = req.body;
        if(!name || !email || !password || !passwordVerify){
            return res.status(403).json({errorMessage:'All fields are required.'}).send();
        

        }
        if(password < 6) return res.status(403).json({errorMessage:'Password not less than 6 characters'});
        if(password != passwordVerify) return res.status(403).json({errorMessage:'Password not match'});
        const existUser = await AuthModel.findOne({email});
        if(existUser) return res.status(403).json({errorMessage:'Email is already registered'});

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new AuthModel({name,email,passwordHash});
        const saveUser = await newUser.save();

        

        const token = jwt.sign({
            user:saveUser._id,
        },process.env.JWT_SECRET,{expiresIn: '5m'});

        const url = `${process.env.CLIENT_URL}/activation/${token}`;
        sendMail(email,url);

        res.json({message:`Please confirm your email to activate your account.`});
     

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

router.put('/verification', async(req,res)=>{
    try{
        const {verify_token} = req.body;
        if(!verify_token) return res.status(400).json({errorMessage:'No verification code'});

        const verification = jwt.verify(verify_token,process.env.JWT_SECRET);
        
        const updateUserVerify = await AuthModel.findByIdAndUpdate(verification.user,{verify:true});
        updateUserVerify.save();
       
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

//login
router.post('/login', async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password) return res.status(403).json({errorMessage:'Check the fields'});
        const userExist = await AuthModel.findOne({email});

        if(!userExist) return res.status(403).json({errorMessage:'Email or password is invalid'});
        if(!userExist.verify) return res.status(403).json({errorMessage:'Please confirm your email address'});

        const passwordCorrect = await bcrypt.compare(password,userExist.passwordHash);
        if(!passwordCorrect) return res.status(403).json({errorMessage:'Email or password is invalid'});



        const token = jwt.sign({
            user:userExist._id
        },process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token', token,{
            httpOnly:true
        }).send({success:'Success',token:token});

       
       
        

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

//logout
router.get('/logout', (req,res)=>{
    try{
        const token = req.cookies.token;
        if(!token) return;

        res.cookie('token','',{
            httpOnly:true,
            expires:new Date(0)
        }).send();

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

//check if its logged in by getting the token
router.get('/loggedIn', async(req,res)=>{
    try{
        const token = req.cookies.token;
        if(!token) return res.json({errorMessage:'Please Login'});

        jwt.verify(token,process.env.JWT_SECRET);

        const access_token = token;

        res.json({access_token});
        
        //res.send(true);

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});


//get the user info 
router.get('/getuser',auth, async(req,res)=>{
    try{
        
        const {id:_id} = req.params;
        const user = await AuthModel.findById(req.user).select('-passwordHash');
       
        //send 
        res.json(user);
        
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
})

//google Login
router.post('/google_login', async(req,res)=>{
    try{
        const {tokenId} = req.body;
        const verify = await client.verifyIdToken({idToken:tokenId,audience:process.env.CLIENT_ID});
        
        const {email_verified,email,name,picture} = verify.payload;
       
        const password = email + process.env.JWT_SECRET;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        if(!email_verified) return res.status(400).json({errorMessage:'Email verification failed'});
        if(email_verified){
            const user = await AuthModel.findOne({email});
            if(user){
                const isMatch = await bcrypt.compare(password,user.passwordHash);
                if(!isMatch) return res.status(400).json({errorMessage:'Password is Incorrect'});
                const token = jwt.sign({
                    user:user._id
                },process.env.JWT_SECRET);
                res.cookie('token',token,{
                    httpOnly:true
                }).send({success:'Success',token:token});
            }
            else{
                const newUser = new AuthModel({name,email,passwordHash,verify:true});
                await newUser.save();
    
                const token = jwt.sign({
                    user: newUser._id
                },process.env.JWT_SECRET);
                res.cookie('token',token,{
                    httpOnly:true
                }).send({success:'Success',token:token});
    
    
                
            }
        }
       

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
})

export default router;