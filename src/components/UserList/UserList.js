import React from 'react';
import Card from '../UI/Card';
import Player from '../UI/Player';

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