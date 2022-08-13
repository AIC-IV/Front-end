import React from 'react';
import classes from './ECard.module.css';

const ECard = (props) => {
  return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default ECard;
