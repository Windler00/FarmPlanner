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
        SeedStore.fetchById(props.rowId)
      },[location,]); 

      async function handleSeedUpdate(event){
        let id = event.target.id
        await SeedStore.updateSeed(id ,createSeedName)
        await SeedStore.fetchById(props.rowId)
        setShowEditModal(false)
      }
     
    function validateRowId(seed, index){
        if (seed.rowId === props.rowId){
            return (<CustomButton id={seed.id} label={index+1 + " "+ seed.name} onClick={() => {openEditModal(seed.id)}}/>)
        }
    }

        return (
            <div className={styles.SeedList}>
                {SeedStore.seedsById.length === 0 ? (
                    <></>
                )
                :
                (
                <ul>
                    {SeedStore.seedsById.map((seed, index) => 
                        <li key={seed.id}>
                            {validateRowId(seed, index)}
                        </li>
                    )}
                    <Modal active={showEditModal} setActive={setShowEditModal}>
                        <CustomInput labelText="Имя" value={createSeedName} handleChange={ChangeCreateSeedName}></CustomInput>
                        <CustomButton id={showEditModalData} label="Изменить" onClick={handleSeedUpdate}/>
                    </Modal>
                </ul>
                )}
            </div>
        )
    
});

export default SeedList