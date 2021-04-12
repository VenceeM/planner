import nodemailer from 'nodemailer';
import {google} from 'googleapis';
import dotEnv from 'dotenv';

dotEnv.config();

const {OAuth2} = google.auth;

const PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    SENDER_MAIL,
    PASSWORD
} = process.env;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    
    PLAYGROUND
)

const sendMail = async function(to,url) {
    try{
        oauth2Client.setCredentials({
            refresh_token:process.env.REFRESH_TOKEN
        });
        const accessToken = await oauth2Client.getAccessToken();
        const smtpTransport = nodemailer.createTransport({
            service:'gmail',
           
            auth:{
                type: 'OAuth2',
                user: 'donotreply.planner@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken
            }
        })
    
        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: to,
            subject: 'Planner',
            html:`Please click <a href="${url}">Confirm</a> to verify your email`
        }
        smtpTransport.sendMail(mailOptions, (err,infor)=>{
            if(err) return err;
            return infor;
            
        });

    }catch(err){
        console.error(err);
    }
   
}


export default sendMail;

