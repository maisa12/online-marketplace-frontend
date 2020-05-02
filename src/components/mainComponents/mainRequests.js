import axios from 'axios';
import queryString from 'query-string';
const categories = async(setVal)=>{
    const request = await axios.get(`http://localhost:8000/category`);
    const array = request.data;
    setVal(array);
   };
const adRequest = async(setAds)=>{
    const request = await axios.get(`http://localhost:8000/main/ads`);
    const array = request.data;
    setAds(array);
   };
const selectCategory = async(slug, setAds, from, to, lastWeek, setPagination, pageNumber, setLoading, postName)=>{
    setLoading(true);
    if(from===undefined)from=0;
    if(to===undefined)to=0;
    let obj = {slug, from, to, lastWeek, pageNumber, postName};
    let query = queryString.stringify(obj);
    const request = await axios.get(`http://localhost:8000/posts/${query}`);
    const resp = request.data;
    setAds(resp.rows);
    setPagination(Math.ceil(resp.count/10));
    setLoading(false);
}
export {categories, adRequest, selectCategory}