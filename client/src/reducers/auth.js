
const initialState = {
    user:[],
    isLogged:false,


}

const authUser =  (state = initialState, action) =>{
    switch(action.type){
        case 'REGISTER':
            return {...state,isLogged:false}
        case 'LOGIN':
            return {...state, isLogged:true}
        case 'LOGOUT':
            return {...state,user:[],isLogged:false}
        case 'GET_USER':
            return {
                ...state, 
                user:action.payload
               
            }
        case 'LOGGEDIN':
            return action.payload;
        case 'ERROR':
            return action.payload;

        default:
            return state;
    }
}

export default authUser;