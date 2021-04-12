export const create = (create) => async(dispatch)=>{

    try{
        dispatch({type:'CREATE',payload:create.data});
    }catch(err){
        console.log(err);
    }
   
}