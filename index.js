import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routers/userRouter.js';
import plannerRouter from './routers/plannerRouter.js';
import path from 'path';
dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
// app.use(cors({
//     credentials:true,
//     origin: ['http://localhost:3000', 'https://app-planner-simple.herokuapp.com']
// }));
app.use((req,res)=>{
    res.header({"Access-Control-Allow-Origin": "*"});
})
app.use(cookieParser());

app.use('/auth', userRouter);
app.use('/planner', plannerRouter);

const PORT = process.env.PORT || 5000;


if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}
mongoose.connect(process.env.MDB_CONNECT , {useNewUrlParser:true,useUnifiedTopology:true},err => {
    if(err) throw err;
    console.log('Connected to MongoDB');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
mongoose.set('useFindAndModify', false);