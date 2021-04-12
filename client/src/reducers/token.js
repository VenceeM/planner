
const tokens = '';


const token = (state = tokens, action)=>{
    switch(action.type){
        case 'GET_TOKEN':
            return action.payload;

        default:
            return state;
    }
}

export default token;