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
import SeedStore from '../../store/SeedStore';
import CategoriesStore from '../../store/CategoriesStore';
import { InputNumber } from 'antd';

const RowList = observer((props) => {
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [modalId, setModalId] = useState(null);

   const [createRowName, setCreateRowName] = useState("");
   function ChangeCreateRowName(event){
     setCreateRowName(event.target.value);
   }
 
   const [createRowDescription, setCreateRowDescription] = useState("");
   function ChangeCreateRowDescription(event){
     setCreateRowDescription(event.target.value);
   }

   const [createRowQuantity, setRowQuantity] = useState(0);

  const [currRowQuantity, setCurrRowQuantity] = useState(0);

  const [rowLength, setRowLength] = useState(0)
  const [rowWidth, setRowWidth] = useState(0)

  let params = useParams();
  let location = useLocation();
    
      useEffect(() => {
        const fetchData = async () => {
          await RowStore.fetchById(params.id)
          await SeedStore.fetchByIds()
          await CategoriesStore.getLevel1()
          await CategoriesStore.getLevel2()
          await CategoriesStore.getLevel3()
        }
      
        fetchData();
      },[location]);

  async function postNewRow(name, description, quantity, fieldId){
    await RowStore.postRow(name, description, quantity, fieldId)
    await RowStore.fetchById(params.id)
    SeedStore.fetchByIds()
  }

  async function handleRowDelete(){
    await RowStore.deleteRow(modalId)
    await RowStore.fetchById(params.id)
    setShowModal(false)
  }

  async function handleRowUpdate(id,name,description, quantity, length, width){
    await RowStore.UpdateRow(id,name,description, quantity, length, width)
    await RowStore.fetchById(params.id)
    SeedStore.fetchByIds()
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
              <div>
				<strong>Колличество: </strong>
				<InputNumber min={0} defaultValue={createRowQuantity} onChange={setRowQuantity}/>
		  	  </div>
              <CustomButton label="Создать" onClick={() => {postNewRow(createRowName, createRowDescription, createRowQuantity, props.fieldId); setShowModal(false)}}/>
          </Modal>
          </div>
      )
      :
      (
        <div className={styles.RowList}>
        {RowStore.rowById.map((row, index) => 
          <div key={row.id} className={styles.RowItem}>
            <div className={styles.RowInfo}>
              <CustomButton id={row.id} label={index+1 + ") " + row.name} onClick={() => {setModalId(row.id);
                                                                                          setCreateRowName(row.name);
                                                                                          setCreateRowDescription(row.description);
                                                                                          setCurrRowQuantity(row.quantity);
                                                                                          setRowLength(row.length);
                                                                                          setRowWidth(row.width);
                                                                                          setShowModal(true)}}/>
              <strong>Описание: {row.description}</strong>
              <strong>Колличество: {row.quantity}</strong>
			  <strong>Длинна(см): {row.length}</strong>
			  <strong>Ширина(см): {row.width}</strong>
            </div>
            <SeedList rowId={row.id}/>
          </div>
        )}

        <Modal active={showModal} setActive={setShowModal}>
          <strong>Ряд</strong>
          <CustomButton label="Удалить" onClick={handleRowDelete}/>
          <CustomInput labelText={"Имя: " + createRowName} value={createRowName} handleChange={ChangeCreateRowName}></CustomInput>
          <CustomInput labelText={"Описание: " + createRowDescription} value={createRowDescription} handleChange={ChangeCreateRowDescription}></CustomInput>
		  <div>
			<strong>Колличество: </strong>
			<InputNumber min={0} defaultValue={currRowQuantity} onChange={setCurrRowQuantity}/>
		  </div>
          <div>
            <strong>Длинна ряда(см): </strong>
            <InputNumber min={0} defaultValue={rowLength} onChange={setRowLength}/>
          </div>
          <div>
            <strong>Ширина ряда(см): </strong>
            <InputNumber min={0} defaultValue={rowWidth} onChange={setRowWidth}/>
          </div>

          <CustomButton label="Изменить" onClick={() => {handleRowUpdate(modalId,
                                                                         createRowName,
                                                                         createRowDescription,
                                                                         currRowQuantity,
                                                                         rowLength,
                                                                         rowWidth
                                                                         )}}/>
        </Modal>

        <div className={styles.RowItem}>
          <CustomButton label="Создать ряд" onClick={() => {setCreateRowName(""); setCreateRowDescription("");setShowCreateModal(true)}}/>
          <Modal active={showCreateModal} setActive={setShowCreateModal}>
            <div className={styles.Modal}>
              <strong>Создать Ряд</strong>
              <CustomInput labelText="Имя" value={createRowName} handleChange={ChangeCreateRowName}/>
              <CustomInput labelText="Описание" value={createRowDescription} handleChange={ChangeCreateRowDescription}/>
              <div>
				<strong>Колличество: </strong>
				<InputNumber min={0} defaultValue={createRowQuantity} onChange={setRowQuantity}/>
		  	  </div>
              <CustomButton label="Создать" onClick={() => {postNewRow(createRowName,
                                                                       createRowDescription,
                                                                       createRowQuantity,
                                                                       props.fieldId);
																	   setRowQuantity(0);
                                                                       setShowCreateModal(false)}}/>
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