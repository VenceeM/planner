import React, { useEffect, useState } from 'react'
import './planlist.css';
import moment from 'moment';
import { useHistory } from 'react-router';
import {Button, Divider, Grow, Icon} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import * as api from '../../../api/index';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
function PlanList({plan,setCurrentId,currentId,update}) {
 
    const [open,setOpen] = useState(false);
    const [achorEl,setAchorEl] = useState(null);
    const o = Boolean(achorEl);

    function handleMoreOption(e){
        setAchorEl(e.currentTarget)
    }
    function close(){
        setAchorEl(null);
    }

    const history = useHistory();
    function handleButton(e){
        e.preventDefault();
        setCurrentId(plan._id);
        setOpen(true);
        
    }
    async function handleUpdate(e){
        e.preventDefault();
        setCurrentId(plan._id);
        history.push('/create');
        setOpen(false);
    }
    async function handleDelete(e){
        e.preventDefault();
        try{
            await api.remove(currentId)
            update();
            setOpen(false);

        }catch(err){
            console.log(err);
        }
    }
    
    function handleClose(){
        setOpen(false);
    }
    
    return (
        <Grow in={true}>
             <div className="list-group">
            

            <button onClick={handleButton} id={moment(plan.date).format('MM/DD/yyyy') === moment().format('MM/DD/yyyy') ? "bt" : moment(plan.date).format('MM/DD/yyyy') < moment().format('MM/DD/yyyy') ? "yesterday" : "sched" } className="list-group-item list-group-item-action" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-2">{plan.title}</h5>
                </div>
               
                <p id="p" className="mb-2">{plan.description}</p>
                <small>{moment(plan.date).format('MM/DD/yyyy')} ({moment(plan.date).fromNow()})</small>
            </button>

            <Dialog   open={open} onClose={handleClose}>
                <DialogTitle className="dialogTi">
                    
                    <div className="diaglogTitle">
                        {plan.title}
                        
                        <div className="iconBtn">
                            <IconButton onClick={handleDelete} color="secondary" className="dialogUpdate">
                                <DeleteIcon/>
                            </IconButton>
                       
                            <IconButton className="dots" onClick={handleMoreOption} 
                            color="inherit"
                            arial-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true">
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu id="long-menu" anchorEl={achorEl} keepMounted open={o} onClose={close}
                            PaperProps={{
                                style: {
                                  height:'auto',
                                  width: '20ch',
                                },
                              }}>
                                <MenuItem onClick={handleUpdate}>Update</MenuItem>
                            </Menu>
                        </div>

                    </div>
                    

                </DialogTitle>
                <DialogContent className="dialogContent" dividers>
                    
                <Typography className="dialogsText" gutterBottom>

                    {plan.description}
                </Typography>
                      
                <Typography gutterBottom>
                    {moment(plan.date).format('MM/DD/yyyy')}
                </Typography>
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}   color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

  
        </div>
        </Grow>
       
    )
}

export default PlanList
