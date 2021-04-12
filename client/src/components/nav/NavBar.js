import React,{useContext, useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import * as api from '../../api/index';
import {logoutUser} from '../../actions/auth';
function NavBar() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const planner = useSelector(state => state.plannerReducers);
    const history = useHistory();

    async function logout(e){
        e.preventDefault();
        try{
            await api.logout();
            localStorage.removeItem('login');
            dispatch(logoutUser())
            auth.user = [];
            planner.plan = [];
            
            history.push('/');
        }catch(err){
            console.error(err);
        }

    }
    
    return (
      
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Planner</span>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <Link className="navbar-brand active"  to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="navbar-brand" to="/about">About</Link>
                    </li>

                    {
                        auth.isLogged ===false && 
                        <>
                        <li className="nav-item">
                          
                            <Link className="navbar-brand" to="/signin">Sign In</Link>
                        </li>
                        </>

                    }

                    {
                        auth.isLogged ===true && 
                        <>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {auth.user.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              
                                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </>

                    }

                   
                   
                 

                </ul>
            
        
                </div>
            </nav>

      
    
    )
}

export default NavBar
