import {  Link, } from 'react-router-dom';
import styles from './CustomLink.module.css';

function CustomInput(props) {
    return (
      <div className={styles.CustomLink}>
          <Link to={props.to}>{props.name}</Link>
      </div>
    );
  }
  
  export default CustomInput;