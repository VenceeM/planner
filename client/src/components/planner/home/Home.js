import React, { useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import './home.css';
import PlanList from '../plan/PlanList';
import {useSelector} from 'react-redux';
import {Button} from '@material-ui/core';
import Login from '../../auth/Login';
function Home({currentId,setCurrentId,update}) {

    const auth = useSelector(state => state.auth);
    const history = useHistory();
    const plans = useSelector(state => state.plannerReducers.plan);
    const handleButton = (e) =>{
        e.preventDefault();
        setCurrentId(null);
        history.push('/create');

    }

  
    return (
        <div className="container">
            <div className="home">
            <div className="title">
                <h1>Planner</h1>      
                <Button variant="contained" onClick={handleButton} color="primary">Create</Button>
          
            </div>
            {
                auth.isLogged  &&(
                    <>
                    <div className="row">
                    {
                        plans && 
                        plans.map(plan => (
                            <div key={plan._id} className="col-md-3">
                                <div className="list">
                                    <PlanList update={update} currentId={currentId} setCurrentId={setCurrentId} plan={plan}/>
                                </div>
                               
                            </div>
                        ))
                    }
                    
                    </div>
                    
                   
                    </>
                )
            }

            {
                auth.isLogged === false && <Redirect to="/signin"/>
            }

            
      
           
        </div>
        

        </div>
       
    )
}

export default Home
