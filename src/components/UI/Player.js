import React from 'react';
import classes from './Player.module.css';

const Player = ({ username, points, image }) => {
  return (
    <div className={classes.container}>
      <img className={classes.profilePicture} alt="Profile" src={image}></img>
      <div className={classes.textInfo}>
        <p className={classes.username}>{username}</p>
        <p className={classes.points}>{points} pontos</p>
      </div>
    </div>
  );
};

export default Player;
