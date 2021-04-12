import React,{useState} from 'react'
import './register.css';
import {TextField,Button} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import Validation from '../validations/Validation';
import * as api from '../../api/index';
import {useDispatch,useSelector} from 'react-redux';
import {register} from '../../actions/auth';
import Alert from '@material-ui/lab/Alert'
const initialState ={
    name:'',
    email:'',
    password:'',
    passwordVerify:'',
    err:'',
    success:''
    
}
function Register() {

    const [registerUser, setRegisterUser] = useState(initialState);
    const {name,email,password,passwordVerify,err,success} = registerUser;
    const dispatch = useDispatch();
    const history = useHistory();
    const handleInput = (e) =>{
        const {name,value} = e.target;
        setRegisterUser({...registerUser,[name]:value,err:'',success:''});
    }
    

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const data = {name,email,password,passwordVerify};
            await api.register(data);

            dispatch(register());
            clear();
            history.push('/success');

            
            

        }catch(error){
            console.log(error.response.data.errorMessage);
            setRegisterUser({...registerUser,err:error.response.data.errorMessage});
            
        }


    }
    function clear(){
        setRegisterUser({...registerUser,name:'',email:'',password:'',passwordVerify:''});

    }



    return (
        <div className="register">
            <div className="form">
                <h1>Register</h1>
                
                <form className="forms" onSubmit={handleSubmit}>
                    {err && (<>
                        <div className="fields">
                            <Alert severity="error">{err}</Alert>
                        </div>
                    </>)}
                    {success && (<>
                        <div className="fields">
                            <Alert severity="info">{success}</Alert>
                        </div>
                    </>)}
                    <div className="fields">
                        <TextField className="textField" variant="outlined" label="Name" type="text" name="name" onChange={handleInput} value={name}/>
                    </div>
                  
                    <div className="fields">
                        <TextField className="textField" variant="outlined" label="Email" type="email" name="email" onChange={handleInput} value={email}/>
                    </div>
                    <div className="fields">
                        <TextField className="textField" variant="outlined" label="Password" type="password" name="password" onChange={handleInput} value={password}/>
                    </div>
                    <div className="fields">
                        <TextField className="textField" variant="outlined" label="Confirm Password" type="password" name="passwordVerify" onChange={handleInput} value={passwordVerify}/>
                    </div>
                    
                    
                    <div className="fields">
                        
                        <Button className="btnSubmit" type="submit" variant="contained" color="primary">Register</Button>
                     
                    </div>
                  
                    

                </form>
            </div>
            
        </div>
    )
}

export default Register
