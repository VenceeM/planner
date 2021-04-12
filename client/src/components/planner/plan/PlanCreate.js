import React,{useEffect, useState} from 'react'
import './planCreate.css';
import {TextField,Button} from '@material-ui/core';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert'
import DateFnsUtils from '@date-io/date-fns';
import * as api from '../../../api/index';
import Validation from '../../validations/Validation';
import {useDispatch, useSelector} from 'react-redux';
import {create} from '../../../actions/planner';
import { useHistory, useParams } from 'react-router';
import moment from 'moment';

const initialState = {
    title:'',
    date:new Date(),
    description:'',
    err:'',
    succ:''
}

function PlanCreate({update,currentId,setCurrentId}) {
    const [planner,setPlanner] = useState(initialState);
    const {title,date,description,err,succ} = planner;
    const [isOk,setIsOk] = useState(false);
    const history = useHistory();
   
    const plannerReducers = useSelector(state => currentId ? state.plannerReducers.plan.find((plan)=> plan._id === currentId): null);
    
    function handleInput(e){
        const {name,value} = e.target;
        setPlanner({...planner, [name]:value,err:'',succ:''});

    }
    async function handleSubmit(e){
        e.preventDefault();
        try{
          const {data} = await api.create({title,date,description});
          update();
          setPlanner({...planner,title:'',date: new Date(), description:'',err:'',succ:data.message});
        }catch(err){
            console.log(err.response.data.errorMessage);
            setPlanner({...planner, err:err.response.data.errorMessage});
        }
    }
    async function handleSubmitUpdate(e){
        e.preventDefault();
        try{
            const {data} = await api.update(currentId,{title,date,description});
            
            update();
            setPlanner({...planner,title:'',date: new Date(), description:'',err:'',succ:data.message});
            setCurrentId(null);

        }catch(err){
            console.log(err);
            setPlanner({...planner,err:err.response.data.errorMessage});
        }
    }
    
    // async function handleSubmitDelete(e){
    //     e.preventDefault();
    //     try{
    //         await api.remove(currentId)
    //         update();
    //         history.push('/');

    //     }catch(err){
    //         setPlanner({...planner,err:err.response.data.errorMessage});
    //     }
    // }
   

    useEffect(()=>{
      
      if(plannerReducers){
        setIsOk(true);
        setPlanner({...planner,title:plannerReducers.title,date:moment(plannerReducers.date).format('MM/DD/yyyy'),description:plannerReducers.description});
        
    }
      
    },[plannerReducers])
    return (
        <div className="planCreate">

            <div className="form">
                {
                    isOk ? <h1>Details</h1> : <h1>Create Plan</h1>
                }
                
                {err && <Alert severity="error">{err}</Alert> }
                {succ && <Alert severity="success">{succ}</Alert>}
               
                <form onSubmit={isOk ? handleSubmitUpdate : handleSubmit}>
                    
                    <div className="fields">
                        <TextField variant="outlined" className="textField" name="title" onChange={handleInput} value={title} label="Title"/>
                    </div>
                    <div className="fields">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker variant="dialog" format="MM/dd/yyyy" inputVariant="outlined" className="textField" label="Date"   onChange={(d)=>setPlanner({...planner,date:d})} name="date" value={date}/>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="fields">
                        <TextField variant="outlined" className="textField" multiline={true}  name="description" onChange={handleInput} value={description} label="Description"/>
                    </div>
                    <div className="fields">
                        <div className="btnFields">
                            
                            <Button className="btnSubmit" type="submit" variant="contained" color="primary">Save</Button>


                        </div>
                        
                    </div>
                    

                </form>
            </div>
            
        </div>
    )
}

export default PlanCreate
