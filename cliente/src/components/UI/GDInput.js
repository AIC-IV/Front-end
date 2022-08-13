import React from 'react';
import classes from './GDInput.module.css';

const GDInput = ({ inputConfig, isValid, errorMessage=''}) => {
  return (
    <>
      <input className={!isValid ? classes.invalid : ''} {...inputConfig} />
      {!isValid && errorMessage && (<span className={classes.error}>{errorMessage}</span>)}
      {(isValid || !errorMessage) && <span className={classes.spacer}></span>}
    </>
  );
}

export default GDInput;