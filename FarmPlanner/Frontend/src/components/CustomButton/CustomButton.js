import React from 'react';
import styles from './CustomButton.module.css';

function CustomButton(props) {
  return (
    <div className={styles}>
        <button disabled={props.disabled} id={props.id} onClick={props.onClick}>
            {props.label}
        </button>
    </div>
  );
}

export default CustomButton;