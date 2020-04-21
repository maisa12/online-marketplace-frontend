const initialState = {
    loading: true, 
    loggedIn: false, 
    status: 'guest',
    name: ''
    };
const loggedInReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOGIN' : 
            return {
                ...state, loggedIn: true, status: action.payload.status, name: action.payload.name
            } ;
        case 'LOGOUT' :
            return {
                loading: false, 
                loggedIn: false, 
                status: 'guest',
                name: ''
                };
        case 'LOADING' :
            return {
                ...state, loading: false
            };  
        default:
            return state
    }
}
export default loggedInReducer ;