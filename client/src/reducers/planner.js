const initialState = {
    data:[]
}

const plannerReducers = (state = initialState, action)=>{
    switch(action.type){
        case 'CREATE':
            return action.payload;
        case 'FETCH_DATA':
            return  action.payload;
        default:
            return state;
    }
}

export default plannerReducers;