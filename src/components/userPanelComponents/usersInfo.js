import React from 'react';
import Typography from '@material-ui/core/Typography';
export default function UsersInfo({userInfo}){

    return(
        <div>
        <Typography variant="h5" gutterBottom>
        მომხმარებლის ინფორმაცია
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
         სახელი: {userInfo.name.split("%")[0]}
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        გვარი: {userInfo.name.split("%")[1]}
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        ელფოსტა: {userInfo.email}
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        მობილურის ნომერი: {userInfo.phone}
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        სტატუსი:{userInfo.status}
      </Typography>
      </div>
    )
}