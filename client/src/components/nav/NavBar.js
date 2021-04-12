import React,{useContext, useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown,Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
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
        <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Navbar.Brand href="/">Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            
          </Nav>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
       
            
            {
                auth.isLogged ===false && 
                    <>
                        <Nav.Link to="/signin">Sign In</Nav.Link>

                    </>

            }
            {
                auth.isLogged ===true && 
                    <>
                    <NavDropdown title={auth.user.name} id="basic-nav-dropdown">

                        <div>
                        <NavDropdown.Item  onClick={logout}>Logout</NavDropdown.Item>

                        </div>
            
                     </NavDropdown>
                   
                    </>

            }

           
          </Nav>
          

        </Navbar.Collapse>
      </Navbar>
      
    //   <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    //             <div className="container-fluid">
    //             <span className="navbar-brand mb-0 h1">Planner</span>
    //             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span class="navbar-toggler-icon"></span>
    //             </button>
    //             <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //             <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
    //                 <li className="nav-item">
    //                     <Link className="navbar-brand active"  to="/">Home</Link>
    //                 </li>
    //                 <li className="nav-item">
    //                 <Link className="navbar-brand" to="/about">About</Link>
    //                 </li>

                    // {
                    //     auth.isLogged ===false && 
                    //     <>
                    //     <li className="nav-item">
                          
                    //         <Link className="navbar-brand" to="/signin">Sign In</Link>
                    //     </li>
                    //     </>

                    // }

                    // {
                    //     auth.isLogged ===true && 
                    //     <>
                    //     <Dropdown>
                    //         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    //             {auth.user.name}
                    //         </Dropdown.Toggle>

                    //         <Dropdown.Menu>
                              
                    //             <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    //         </Dropdown.Menu>
                    //     </Dropdown>
                    //     </>

                    // }

                   
                   
                 

    //             </ul>
    //             </div>
            
        
    //             </div>
    //         </nav>
    
    )
}

export default NavBar
