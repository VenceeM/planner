import React,{useState,useEffect} from 'react'
import './login.css';
import {Button, TextField, Typography} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {loginDispatch} from '../../actions/auth';
import * as api from '../../api/index';
import Alert from '@material-ui/lab/Alert'
import GoogleLogin from 'react-google-login';

//inputs
const initialState = {
    email:'',
    password: '',
    err: '',
    success:''
}
function Login() {
    
    const [user,setUser] = useState(initialState);
    const {email,password,err,success} = user;
   
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth);
   
    
    //inputs
    function handleInput(e){
        const {name,value} = e.target;
        setUser({...user,[name]:value,err:'',success:''});
    }

    //login
    async function handleSubmit(e){
        e.preventDefault();
        try{
            
            const data = {
                email,password
            }
            const login = await api.login(data);
            
               

            setUser({...user,err:'',success:login.data});

            localStorage.setItem('login',true);
            dispatch(loginDispatch());
          
            history.push('/');
            
        }catch(err){
           console.log(err.response.data);
           setUser({...user, err:err.response.data.errorMessage});
           
        }

    }
    async function responseGoogle(response){
       
        try{
            const res = await api.google({tokenId:response.tokenId});

            localStorage.setItem('login', true);
            dispatch(loginDispatch());
            history.push('/');

        }catch(err){
            console.log(err.response.data);
        }

    }

    

    useEffect(()=>{
        let isMounted = true;
        if(isMounted){
            if(auth.isLogged === true){
                history.push('/');
            }
        }
        return () => {isMounted = false};
    })

    return (
        <div className="login">
            <div className="form">
                <h1>Sign In</h1>
                
                <form className="forms" onSubmit={handleSubmit}>
                    {err && (<>
                        <div className="fields">
                            <Alert severity="error">{err}</Alert>
                        </div>
                    </>)}
                  
                    <div className="fields">
                        <TextField className="textField" variant="outlined" label="Email" type="email" name="email" onChange={handleInput} value={email}/>
                    </div>
                    <div className="fields">
                        <TextField className="textField" variant="outlined" label="Password" type="password" name="password" onChange={handleInput} value={password}/>
                    </div>
                    
                    
                    <div className="fields">
                        <Button className="btnSubmit" type="submit" variant="contained" color="primary">Sign In</Button>
                        <Typography className="typo">Don't have an account yet?<a href="/register">  Sign Up</a></Typography>
                        
                    </div>
                    <div className="hr">
                            

                            <GoogleLogin className="goo"
                                clientId="732615304064-bk2rkejst3f0cl5haf334v6vame003v5.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                
                                onSuccess={responseGoogle}
                                
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                  
                   
                   

                </form>
            </div>
           
        </div>
    )
}

export default Login
