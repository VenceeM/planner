import * as api from '../api/index';
import React,{useContext} from 'react';




export const register = () => async(dispatch)=>{
    try{
        dispatch({type:'REGISTER'});

    }catch(err){
        console.error(err);
    }
}

export const loginDispatch = () =>{
    return {
        type: 'LOGIN',
    }
}

export const fetchUser = async() =>{
    try{
        const res = await api.getuser();
        return res;
    }catch(err){
        console.log(err);
    }
}

export const dispatchUser = (res) => async(dispatch)=>{
    
    dispatch({
        type:'GET_USER',
        payload:res.data
    })
    
}

export const logoutUser = () => async(dispatch)=>{
    try{
        dispatch({type:'LOGOUT'});

    }catch(err){
        console.error(err);
    }
}

