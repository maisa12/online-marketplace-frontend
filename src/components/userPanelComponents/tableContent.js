async function ads(setColumns, setRows){
    setColumns([
      { id: 'name', label: 'განცხადება', minWidth: '20%' },
      { id: 'active', label: 'სტატუსი', minWidth: '20%' },
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
    const request = await fetch(`http://localhost:8000/userAds`,
    {
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }
   );
    const adsArray = await request.json();
    setRows(adsArray)
  };
  async function info(setUserInfo){
    const request = await fetch(`http://localhost:8000/usersInfo`,
    {
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }
   );
    const adsArray = await request.json();
    setUserInfo(adsArray);
  }
  export {ads, info};