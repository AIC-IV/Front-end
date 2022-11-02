import React from 'react';
import Card from '../UI/Card';
import Player from '../UI/Player';

const UserList = () => {

  const users = [
    { 'id': 1, 'username': 'Anniely', 'image': '/a1.png', 'points': 90 },
    { 'id': 2, 'username': 'Laura', 'image': '/a1.png', 'points': 85 },
    { 'id': 3, 'username': 'Cabeça', 'image': '/a1.png', 'points': 77 },
    { 'id': 4, 'username': 'Hans', 'image': '/a1.png', 'points': 76 },
    { 'id': 5, 'username': 'Bruna M.', 'image': '/a1.png', 'points': 71 },
    { 'id': 6, 'username': 'Bruna F.', 'image': '/a1.png', 'points': 60 },
    { 'id': 7, 'username': 'Camila', 'image': '/a1.png', 'points': 50 },
    { 'id': 8, 'username': 'Paulo', 'image': '/a1.png', 'points': 40 },
    { 'id': 9, 'username': 'Carlos', 'image': '/a1.png', 'points': 35 },
    { 'id': 10, 'username': 'Alex', 'image': '/a1.png', 'points': 25 }
  ]

  return <Card color='white'>
    { users.map(user => {
      return <Player key={user.id} username={user.username} points={user.points} image={user.image} />
    })}
  </Card>
}

export default UserList;