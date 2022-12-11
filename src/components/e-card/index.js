import React from 'react';

import classes from './style.module.css';

const ECard = (props) => {
  return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default ECard;
