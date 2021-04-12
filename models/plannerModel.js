import mongoose from 'mongoose';


const plannerSchema = new mongoose.Schema({
    title:{type:String,require:String},
    date:{type:Date,require:true},
    description:{type:String,require:true},
    user:{type:String,require:true},
    createdAt:{type:Date, default:new Date()}
});


const PlannerModel = mongoose.model('PlannerModel',plannerSchema);


export default PlannerModel;