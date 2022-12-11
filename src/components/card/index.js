import React from 'react';

import classes from './style.module.css';

const Card = (props) => {
  return <div className={`${classes.card} ${classes[props.color]}`}>{props.children}</div>
}

export default Card;

