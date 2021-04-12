import express from 'express';
import auth from '../middleware/auth.js';
import PlannerModel from '../models/plannerModel.js';
import AuthModels from '../models/authModels.js';
const router = express.Router();

//fetch data
router.get('/',auth,async(req,res)=>{
    try{
        const user = req.user;

        const data = await PlannerModel.find({user});

        res.status(200).json({plan:data});


    }catch(err){
        console.error(err);
        res.status(500).json({errorMessage:'Something went wrong.'});
    }
});

//create
router.post('/create', auth,async(req,res)=>{
    try{
        const {title,date,description} = req.body;
        if(!title || !date || !description) return res.status(404).json({errorMessage:'All fields are required'});

        const user = req.user;
        

        const newPlan = new PlannerModel({title,date,description,user:user});
        const savePlan = await newPlan.save();

        res.json({message:'New plan has been created',savePlan});


    }catch(err){
        console.error(err);
        res.status(500).json({errorMessage:'Something went wrong'});
    }
});

//update 
router.put('/update/:id', auth,async(req,res)=>{
    try{
        const {id:_id} = req.params;
        const {title,date,description} = req.body;
        if(!title || !date || !description) return res.status(404).json({errorMessage:'Check fields'});

        const user = req.user;

        const updatePlan = await PlannerModel.findByIdAndUpdate(_id,{title,date,description,user:user});
        await updatePlan.save();

        res.status(200).json({message:'Plan has been updated'});

        
    }catch(err){
        console.error(err);
        res.status(500).json({errorMessage:'Something went wrong'});
    }
});

//delete
router.delete('/delete/:id', auth, async(req,res)=>{
    try{
        const {id:_id} = req.params;
        await PlannerModel.findByIdAndDelete(_id);
        
        res.json({message:"Plan has been deleted"});

    }catch(err){
        console.error(err);
        res.status(500).json({errorMessage:'Something went wrong'});
    }
});

//deleteAll
router.delete('/deleteall', auth,async(req,res)=>{
    try{
        
        await PlannerModel.deleteMany();

        res.json({message:'All plan has been deleted'});


    }catch(err){
        console.error(err);
        res.status(500).json({errorMessage:'Something went wrong'});
    }
})


export default router;