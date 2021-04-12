import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Router from './routers/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import {useSelector,useDispatch} from 'react-redux';
import {loginDispatch,fetchUser,dispatchUser} from './actions/auth';
import * as api from './api/index';
axios.defaults.withCredentials = true;


function App() {

  
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const [currentId,setCurrentId] = useState(null);
    const dispatch = useDispatch();
    async function getLoggedIn(){
        const loggedInRes = await axios.get('https://simple-planner-project.herokuapp.com//auth/loggedIn');
        
        if(!loggedInRes.data.access_token){
          return console.log("");
        }
        dispatch({type:'GET_TOKEN', payload:loggedInRes.data.access_token});
        
    }
    async function getPlanner(){
      const {data} = await api.fetchdata();

      if(!data){
        return console.log('');
      }
      dispatch({type:'FETCH_DATA', payload:data});
    }
   
    useEffect(() =>{
         
         const loginStorage = localStorage.getItem('login');
         if(loginStorage){
            getLoggedIn();
            getPlanner();
            if(token){
                const getUser = async() =>{
                    dispatch(loginDispatch());
                    return fetchUser(token).then(res =>{
                        dispatch(dispatchUser(res));
                    })
                }
                getUser();
              
            }
           
         }    
    },[auth.isLogged,token,dispatch]);
    
  return (
   
    <div className="App">
      <Router update={getPlanner} currentId={currentId} setCurrentId={setCurrentId}/>
    </div>
   
    
  );
}

export default App;
