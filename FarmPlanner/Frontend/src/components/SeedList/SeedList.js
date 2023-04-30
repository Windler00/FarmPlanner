import styles from './SeedList.module.css';
import CustomButton from './../CustomButton/CustomButton';
import React, {  useEffect, useState } from 'react';
import SeedStore from '../../store/SeedStore';
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom';
import CustomInput from '../CustomInput/CustomInput';
import Modal from '../Modal/Modal';

 const SeedList =  observer((props) => {
 const [showModal, setShowModal] = useState(false);
 const [showEditModal, setShowEditModal] = useState(false);
 const [showEditModalData, setShowEditModalData] = useState(null);
 function openEditModal(data){
    setShowEditModalData(data)
    setShowEditModal(true)
 }

//input for create seed
const [createSeedName, setCreateSeedName] = useState("");
function ChangeCreateSeedName(event){
  setCreateSeedName(event.target.value);
}

const [createSeedQuantity, setCreateSeedQuantity] = useState(1);
function ChangeCreateSeedQuantity(event){
  setCreateSeedQuantity(event.target.value);
}

    let location = useLocation()
      useEffect(() => {
        SeedStore.fetchAll()
      },[location,]); 

      async function handleSeedUpdate(event){
        let id = event.target.id
        await SeedStore.updateSeed(id ,createSeedName)
        await SeedStore.fetchAll()
        setShowEditModal(false)
      }
     
    function validateRowId(seed){
        if (seed.rowId === props.rowId){
            return (<CustomButton id={seed.id} label={seed.name} onClick={() => {openEditModal(seed.id)}}/>)
        }
    }

        return (
            <div className={styles.SeedList}>
                {SeedStore.seedList.length === 0 ? (
                    <></>
                )
                :
                (
                <ul>
                    {SeedStore.seedList.map((seed) => 
                        <li key={seed.id}>
                            {validateRowId(seed)}
                        </li>
                    )}
                    <Modal active={showEditModal} setActive={setShowEditModal}>
                        <CustomInput labelText="Имя" value={createSeedName} handleChange={ChangeCreateSeedName}></CustomInput>
                        <CustomButton id={showEditModalData} label="Изменить" onClick={handleSeedUpdate}/>
                    </Modal>
                </ul>
                )}
                <>
                    <CustomButton label="+" onClick={() => setShowModal(true)}/>
                    <Modal active={showModal} setActive={setShowModal}>
                            <CustomInput labelText="Имя" value={createSeedName} handleChange={ChangeCreateSeedName}></CustomInput>
                            <CustomInput labelText="Количество " value={createSeedQuantity} handleChange={ChangeCreateSeedQuantity}></CustomInput>
                            <CustomButton label="Создать" onClick={() => {SeedStore.postSeed(createSeedName, props.rowId, createSeedQuantity); setShowModal(false);}}/>
                    </Modal>
                 </>
            </div>
        )
    
});

export default SeedList