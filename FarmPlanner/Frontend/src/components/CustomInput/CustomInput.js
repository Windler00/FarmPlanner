import React from 'react';
import styles from './CustomInput.module.css';

function CustomInput(props) {
  return (
    <div className={styles}>
        <label id={props.id}><strong>{props.labelText}</strong></label>
        <input type="text" value={props.value} onChange={props.handleChange} />
    </div>
  );
}

export default CustomInput;