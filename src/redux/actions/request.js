import {loading} from './loading';
import {logIn} from './logIn';
import axios from 'axios';
export const request = () => {
    return async function(dispatch){
        const token = localStorage.getItem('JWT');
        try{
          if(token!==null){
            var request = await axios.get('http://localhost:8000/findUser', {
               headers: {
                 Authorization: `JWT ${token}`
               }
            });
            var response = request.data;
            if(response.auth===true){
             dispatch(logIn(response.status, response.name.split("%")[0]+" "+response.name.split("%")[1]));
            };
         }
         dispatch(loading());
        }
        catch(error){
          console.log(error);
        }
       
    }
}