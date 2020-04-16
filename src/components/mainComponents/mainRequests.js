const categories = async(setVal)=>{
    const request = await fetch(`http://localhost:8000/category`)
    const array = await request.json();
    setVal(array);
   };
const adRequest = async(setAds)=>{
    const request = await fetch(`http://localhost:8000/main/ads`);
    const array = await request.json();
    setAds(array);
   };
const selectCategory = async(slug, setAds, from, to, lastWeek, setPegination, pageNumber)=>{
    const request = await fetch(`http://localhost:8000/ads/${slug}/${from}/${to}/${lastWeek}/${pageNumber}`);
    const resp = await request.json();
    setAds(resp.rows);
    setPegination(Math.ceil(resp.count/10));
}
export {categories, adRequest, selectCategory}