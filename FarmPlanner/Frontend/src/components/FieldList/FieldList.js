import React, { useState, useEffect } from 'react';
import styles from './FieldList.module.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import CustomLink from '../CustomLink/CustomLink';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import FieldStore from '../../store/FieldStore';
import LeftBarStore from '../../store/LeftBarStore';


const FieldList = observer(() => {
  let location = useLocation()

  //input for create field
  const [createFieldName, setCreateFieldName] = useState("");
  function ChangeCreateFieldName(event){
    setCreateFieldName(event.target.value);
  }

  const [createFieldDescription, setCreateFieldDescription] = useState("");
  function ChangeCreateFieldDescription(event){
    setCreateFieldDescription(event.target.value);
  }

  useEffect(() => {
    FieldStore.fetchAll()
  }, [location]);

  return (
    <div className={styles.FieldList}>
      <div className={styles.CloseLeftBar}>
    	<CustomButton label={"Закрыть"} onClick={() => {LeftBarStore.setInactive()}}/>
      </div>
      <div className={styles.inputBlock}>
            <CustomInput labelText="Имя" value={createFieldName} handleChange={ChangeCreateFieldName}/>
            <CustomInput labelText="Описание" value={createFieldDescription} handleChange={ChangeCreateFieldDescription}/>
            <CustomButton onClick={async () => {FieldStore.postField(createFieldName, createFieldDescription)}} label="Создать грядку"/>
        </div>
          <ul>
            {FieldStore.fieldList.map((field, index) => (
              <li key={field.id}>
                <CustomLink to={"/field/" + field.id} name={index+1 + ") " + field.name}></CustomLink>
              </li>
            ))}
          </ul>
      </div>
  );
})

export default FieldList