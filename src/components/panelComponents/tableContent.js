
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
      const request = await fetch(`http://localhost:8000/users`);
      const userArray = await request.json();
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
    const request = await fetch(`http://localhost:8000/categories`);
    const array = await request.json();
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
        id: 'category',
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
    const request = await fetch(`http://localhost:8000/ads`);
    const adsArray = await request.json();
    adsArray.forEach(x=>x.author=x['users.author'].split("%")[0]+" "+x['users.author'].split("%")[1]);
    setRows(adsArray)
  }
  export {ads, category, user}