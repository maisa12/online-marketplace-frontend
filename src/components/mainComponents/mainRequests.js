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
const selectCategory = async(slug, setAds, from, to, lastWeek)=>{
    const request = await fetch(`http://localhost:8000/ads/${slug}/${from}/${to}/${lastWeek}`);
    const array = await request.json();
    setAds(array);
}
export {categories, adRequest, selectCategory}