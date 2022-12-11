import React from 'react';

import Card from '../card';
import Player from '../player';

const UserList = ({users}) => {

  return <Card color='white'>
    { [].concat(users)
      .sort((a, b) => b.points - a.points)
      .map((user) => 
        <Player
            key={user.username}
            username={user.username}
            points={user.points}
            image={user.image}
          />
      ) 
    }
  </Card>
}

export default UserList;