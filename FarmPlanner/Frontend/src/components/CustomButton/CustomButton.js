import React from 'react';
import styles from './CustomButton.module.css';

function CustomButton(props) {
  const BackgroundColor = {
    backgroundColor: props.Background ? '#7ed8c3' : ''
  };
  return (
        <button style={BackgroundColor} className={styles} disabled={props.disabled} name={props.name} id={props.id} onClick={props.onClick}>
            {props.label}
        </button>
  );
}

export default CustomButton;