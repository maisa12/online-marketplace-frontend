import axios from 'axios';
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
const selectCategory = async(slug, setAds, from, to, lastWeek, setPegination, pageNumber, setLoading)=>{
    const request = await axios.get(`http://localhost:8000/ads/${slug}/${from}/${to}/${lastWeek}/${pageNumber}`);
    const resp = request.data;
    setAds(resp.rows);
    setPegination(Math.ceil(resp.count/10));
    setLoading(false);

}
export {categories, adRequest, selectCategory}