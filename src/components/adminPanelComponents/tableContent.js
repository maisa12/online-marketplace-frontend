
import axios from 'axios';
async function user(setColumns, setRows){
    setColumns([{ id: 'name', label: 'სახელი/გვარი', minWidth: '20%' },
    { id: 'number', label: 'მობილურის ნომერი', minWidth: '25%' },
    {
      id: 'email',
      label: 'ელ-ფოსტა',
      minWidth: '35%',
    },
    {
      id: 'status',
      label: 'სტატუსი',
      minWidth: '20%',
      align: 'right'
    },
    {
        id: 'edition',
        label: 'რედაქტირება',
        minWidth: '20%',
        align: 'right',
      }]);
      const request = await axios.get(`http://localhost:8000/users`,
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('JWT')}`
        }
      }
     );
      const userArray = request.data;
      userArray.forEach(x=>x.name=x.name.split("%")[0]+" "+x.name.split("%")[1]);
      setRows(userArray);
  }
  //category table request
  async function  category(setColumns, setRows){
    setColumns([
      { id: 'name', label: 'კატეგორია', minWidth: '20%' },
      { id: 'slug', label: 'Slug', minWidth: '25%' },
      { id: 'position', label: 'პოზიცია', minWidth: '25%' },
      {
        id: 'edition',
        label: 'რედაქტირება',
        minWidth: '30%',
        align: 'right',
      }
    ]);
    const request = await axios.get(`http://localhost:8000/category`);
    const array = request.data;
    setRows(array)
  }
  //Ads table request
  async function ads(setColumns, setRows){
    setColumns([
      { id: 'name', label: 'განცხადება', minWidth: '20%' },
      { id: 'active', label: 'სტატუსი', minWidth: '20%' },
      {
        id: 'author',
        label: 'ავტორი',
        minWidth: '20%',
      },
      {
        id: 'categories.name',
        label: 'კატეგორია',
        minWidth: '20%',
        align: 'right'
      },
      {
          id: 'edition',
          label: 'რედაქტირება',
          minWidth: '20%',
          align: 'right',
        }
    ]);
    const request = await axios.get(`http://localhost:8000/ads`,
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }
   );
    const adsArray = request.data;
    adsArray.forEach(x=>{
      x.author=x['users.author'].split("%")[0]+" "+x['users.author'].split("%")[1];

    });
    setRows(adsArray)
  }
  export {ads, category, user}