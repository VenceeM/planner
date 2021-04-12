import jwt from 'jsonwebtoken';


const auth = (req,res,next) =>{
    try{
        const token = req.cookies.token;
        if(!token) return res.status(401).json({errorMessage:'Unauthorize'});

        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified.user;

        next();

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

export default auth;