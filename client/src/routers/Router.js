import React from 'react'
import Home from '../components/planner/home/Home';
import NavBar from '../components/nav/NavBar';
import Login from '../components/auth/Login';
import {BrowserRouter,Redirect,Route,Switch} from 'react-router-dom';
import Register from '../components/auth/Register';
import { useSelector } from 'react-redux';
import RegisterSuccess from '../components/auth/RegisterSuccess';
import Activation from '../components/auth/Activation';
import PlanCreate from '../components/planner/plan/PlanCreate';
import About from '../components/planner/home/About';
function Router({update,currentId,setCurrentId}) {
    const auth = useSelector(state => state.auth);
    return (
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route exact path='/'>
                    <Home update={update} currentId={currentId} setCurrentId={setCurrentId}/>
                </Route>

                <Route path='/signin'><Login/></Route>

                
                <Route exact path='/success'>
                    <RegisterSuccess/>
                </Route>

                <Route exact path='/activation/:verify_token'>
                    <Activation/>
                </Route>

                <Route exact path='/about'>
                    <About/>
                </Route>
                
                {
                    auth.isLogged === false && <Route path='/register'><Register/></Route>
                }
                
                {
                    auth.isLogged === true ? <Route exact path='/create'><PlanCreate setCurrentId={setCurrentId} currentId={currentId} update={update}/></Route> :<Redirect to='/signin'/>
                }
                {/* <Route path='/register'>
                    {auth.isLogged ? <Redirect to="/"/> : <Register/>}
                </Route> */}
               

                
            </Switch>
        </BrowserRouter>
    )
}

export default Router
