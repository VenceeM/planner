import axios from 'axios';


//auth
//https://planner-simple-app.herokuapp.com/
//https://simple-planner-project.herokuapp.com
axios.defaults.baseURL ='https://simple-planner-project.herokuapp.com';
// const URL_REGISTER = 'http://localhost:5000/auth/register';
// const URL_LOGIN = 'http://localhost:5000/auth/login';
// const URL_LOGOUT = 'http://localhost:5000/auth/logout';
// const URL_GETUSER = 'http://localhost:5000/auth/getuser';
// const URL_VERIFICATION = 'http://localhost:5000/auth/verification';
// const URL_GOOGLE = 'http://localhost:5000/auth/google_login'
export const register = (register) => axios.post('/auth/register',register);
export const login = (login) => axios.post('/auth/login', login);
export const logout = () => axios.get('/auth/logout');
export const getuser = (token) => axios.get('/auth/getuser',token);
export const verification = (verify) => axios.put('/auth/verification',verify);
export const google = (tokenId) => axios.post('/auth/google_login', tokenId);


//planner
// const URL_CREATE = 'http://localhost:5000/planner/create';
// const URL_FETCH = 'http://localhost:5000/planner';
// const URL_UPDATE = 'http://localhost:5000/planner/update';
// const URL_DELETE = 'http://localhost:5000/planner/delete';

export const create = (plan) => axios.post('/planner/create',plan);
export const fetchdata = () => axios.get('/planner');

export const update =(id,data) => axios.put(`/planner/update/${id}`,data);
export const remove = (id) => axios.delete(`/planner/delete/${id}`);
