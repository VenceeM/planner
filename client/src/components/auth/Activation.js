import React, { useEffect, useState } from 'react'
import { Redirect, useHistory, useParams } from 'react-router'
import * as api from '../../api/index';
import axios from 'axios';
import {dispatchUser, loginDispatch} from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './activation.css';
function Activation() {
    
    const {verify_token} = useParams();
    
    useEffect(()=>{
        if(verify_token){
            const activateEmail = async() =>{
                try{
                    await api.verification({verify_token});
                   
                }catch(err){
                    console.log(err);
                }
            }
            activateEmail();
        }
    },[verify_token]);

    return (
        <div className="activation">
            <div className="mess">
                <Redirect to='/signin'/>
            </div>
        </div>
    )
}

export default Activation
