import styles from './RowList.module.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SeedList from '../SeedList/SeedList';
import { useLocation } from 'react-router-dom';
import RowStore from '../../store/RowStore';
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';
import { observer, } from 'mobx-react-lite';
import Modal from '../Modal/Modal';

const RowList = observer((props) => {
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [modalId, setModalId] = useState(null);
  const [modalName, setModalName] = useState("");
  const [modalDescription, setModalDescription] = useState("");

   //input for create row
   const [createRowName, setCreateRowName] = useState("");
   function ChangeCreateRowName(event){
     setCreateRowName(event.target.value);
   }
 
   const [createRowDescription, setCreateRowDescription] = useState("");
   function ChangeCreateRowDescription(event){
     setCreateRowDescription(event.target.value);
   }

   const [createRowLength, setRowLength] = useState(1);
   function ChangeRowLength(event){
    setRowLength(event.target.value);
  }

  let params = useParams();
  let location = useLocation();
    
      useEffect(() => {
        RowStore.fetchById(params.id)
      },[location]);

  async function postNewRow(name, description, length, fieldId){
    await RowStore.postRow(name, description, length, fieldId)
    await RowStore.fetchById(params.id)
  }

  async function handleRowDelete(){
    await RowStore.deleteRow(modalId)
    await RowStore.fetchById(params.id)
    setShowModal(false)
  }

  async function handleRowUpdate(id,name,description){
    await RowStore.UpdateRow(id,name,description)
    await RowStore.fetchById(params.id)
    setShowModal(false)
  }
    return (
    <>
      {RowStore.rowById.length === 0 ? (
        <div className={styles}>
          <CustomButton label="Создать ряд" onClick={() => {setShowModal(true)}}/>
          <Modal active={showModal} setActive={setShowModal}>
              <CustomInput  labelText="Имя" value={createRowName} handleChange={ChangeCreateRowName}/>
              <CustomInput labelText="Описание" value={createRowDescription} handleChange={ChangeCreateRowDescription}/>
              <CustomInput labelText="Длинна" value={createRowLength} handleChange={ChangeRowLength}/>
              <CustomButton label="Создать" onClick={() => {postNewRow(createRowName, createRowDescription, createRowLength, props.fieldId); setShowModal(false)}}/>
          </Modal>
          </div>
      )
      :
      (
        <div className={styles.RowList}>
        {RowStore.rowById.map((row) => 
          <div key={row.id} className={styles.RowItem}>
            <CustomButton id={row.id} label={row.id + " " + row.name + " " + row.description} onClick={() => {setModalId(row.id);setModalName(row.name);setModalDescription(row.description);setShowModal(true)}}/>
            <SeedList rowId={row.id}></SeedList>
          </div>
        )}

        <Modal active={showModal} setActive={setShowModal}>
          <strong>Ряд</strong>
          <CustomButton label="Удалить" onClick={handleRowDelete}/>
          <CustomInput labelText={"Имя: " + modalName} value={createRowName} handleChange={ChangeCreateRowName}></CustomInput>
          <CustomInput labelText={"Описание: " + modalDescription} value={createRowDescription} handleChange={ChangeCreateRowDescription}></CustomInput>
          <CustomButton label="Изменить" onClick={() => {handleRowUpdate(modalId, createRowName, createRowDescription)}}/>
        </Modal>

        <div className={styles.RowItem}>
          <CustomButton label="Создать ряд" onClick={() => {setShowCreateModal(true)}}/>
          <Modal active={showCreateModal} setActive={setShowCreateModal}>
            <div className={styles.Modal}>
              <strong>Создать Ряд</strong>
              <CustomInput labelText="Имя" value={createRowName} handleChange={ChangeCreateRowName}/>
              <CustomInput labelText="Описание" value={createRowDescription} handleChange={ChangeCreateRowDescription}/>
              <CustomInput labelText="Длинна" value={createRowLength} handleChange={ChangeRowLength}/>
              <CustomButton label="Создать" onClick={() => {postNewRow(createRowName, createRowDescription, createRowLength, props.fieldId); setShowCreateModal(false)}}/>
            </div>
          </Modal>
        </div>
      </div>
      )
    }
    </>
 )
})

export default RowList