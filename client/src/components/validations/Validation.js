import React from 'react'
import {Typography} from '@material-ui/core';
import './validation.css';
function Validation({hidden,message,isSucc}) {
    
    return (
        <div className="rootValidation">
            <div className={isSucc}>
                <Typography className="err"  hidden={hidden}>{message}</Typography>
            </div>
        </div>
       
        
    )
}

export default Validation
