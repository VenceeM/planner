import mongoose from 'mongoose';


const authSchema = new mongoose.Schema({
    name: {type:String,require:true},
    email:{type:String,require:true},
    passwordHash:{type:String,require:true},
    verify:{type:Boolean, default:false}
});

const UserModel = mongoose.model('UserModel', authSchema);
export default UserModel;