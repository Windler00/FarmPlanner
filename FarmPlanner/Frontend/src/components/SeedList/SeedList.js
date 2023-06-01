import styles from './SeedList.module.css';
import CustomButton from './../CustomButton/CustomButton';
import React, { useState } from 'react';
import SeedStore from '../../store/SeedStore';
import { observer } from 'mobx-react-lite'
import Modal from '../Modal/Modal';
import CategoriesStore from '../../store/CategoriesStore';
import { DatePicker, InputNumber, Checkbox } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';


const SeedList =  observer((props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModalId, setShowEditModalId] = useState(null);
  function openEditModal(id){
     setShowEditModalId(id)
     setShowEditModal(true)
  }
 
  const [currCategory, setCurrCategory] = useState("")
  function handleSetCurrCategory(event){
    let name = event.target.name
    setCurrCategory(name)
  }

  const [date, setDate] = useState(null)
  const changeDate = (date) => {
    setDate(date)
  }

  const [isPlanted, setIsPlanted] = useState(false)
  const [length, setLength] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
 
  const Level3 = observer((props) => {
    return(
      CategoriesStore.CategoriesLevel3.map(level3 => 
        <div className={styles.Level3}>
          {props.parentId === level3.parentId ? (
            <ul>
              <li>
                <CustomButton name={level3.name} label={level3.name} onClick={handleSetCurrCategory}/>
              </li>
            </ul>
          )
          :
          (<></>)
          }
        </div>
      )
    )
  })

  const Level2 = observer((props) => {
   return(
     CategoriesStore.CategoriesLevel2.map(level2 => 
     <div className={styles.Level2}>
       {props.parentId === level2.parentId ? (
         <ul key={level2.id}>
           <li>
             <CustomButton name={level2.name} label={level2.name} onClick={handleSetCurrCategory}/>
             <Level3 parentId={level2.id} />
           </li>
         </ul>
       )
     :
     (<></>)}
     </div>
     ))
  })
 
  const Level1 = observer(() =>{
   return (
   CategoriesStore.CategoriesLevel1.map(level1 => 
     <div className={styles.Level1}>
       <ul>
         <li key={level1.id}>
         <CustomButton name={level1.name} label={level1.name} onClick={handleSetCurrCategory}/>
           <Level2 parentId={level1.id}/>
       </li>
       </ul>
     </div>
   ))
  })

  const HandleSeedList = observer(() => {
    const seedsToDisplay = SeedStore.seedsById.filter((seed) => seed.rowId === props.rowId);
    return (
      seedsToDisplay.map((seed, index) => 
      (
        <li key={index}>
          <div className={styles.SeedInfo}>
            <CustomButton Background={seed.isPlanted} id={seed.id} label={index+1 + ") " + seed.name} onClick={() =>	{setCurrCategory(seed.name);
                                                                                        	setDate(new dayjs(seed.dateMonth + "/" + seed.dateDay + "/" + seed.dateYear));
                                                                                        	setHeight(seed.height);
                                                                                        	setWidth(seed.width);
                                                                                        	setLength(seed.length);
																							setIsPlanted(seed.isPlanted);
                                                                                        	openEditModal(seed.id,)}}/>
            <strong>Дата высадки: </strong>
            <strong>{seed.dateDay + "." +  seed.dateMonth + "." + seed.dateYear}</strong>
            <strong>Высота(см): {seed.height}</strong>
            <strong>Длинна(см): {seed.length}</strong>
            <strong>Ширина(см): {seed.width}</strong>
          </div>
        </li>
      )
    )
)})

       function handleSeedUpdate(event){
         let id = event.target.id
         let day = date.date()
         let month = date.month() + 1
         let year = date.year()
         SeedStore.updateSeed(id ,currCategory, day, month, year,  isPlanted, length, height, width)
         setShowEditModal(false)
       }

	   function handlePlantedChange(){
		if(isPlanted === true){
			setIsPlanted(false)
		}
		else{
			setIsPlanted(true)
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
                     <HandleSeedList/>
                     <Modal active={showEditModal} setActive={setShowEditModal}>
                         <h1>Текущая категория: {currCategory === "" ? (<>Пусто</>) : (<>{currCategory}</>)}</h1>
                         <DatePicker value={dayjs(date, dateFormatList[0])} format={dateFormatList}  onChange={changeDate} allowClear={false} locale={locale}/>
                         <div style={{marginTop:6}}>
                          <strong>Высота(см): </strong>
                          <InputNumber min={0} defaultValue={height} onChange={setHeight}/>
                         </div>
                         <div style={{marginTop:6}}>
                          <strong>Длинна(см): </strong>
                          <InputNumber min={0} defaultValue={length} onChange={setLength}/>
                         </div>
                         <div style={{marginTop:6}}>
                          <strong>Ширина(см): </strong>
                          <InputNumber min={0} defaultValue={width} onChange={setWidth}/>
                         </div>
						 <div>
							<Checkbox defaultChecked={isPlanted} onChange={() => handlePlantedChange()}><strong>Высажено</strong></Checkbox>
						 </div>
                         
                         <Level1/>
                         <CustomButton id={showEditModalId} label="Изменить" onClick={handleSeedUpdate}/>
                     </Modal>
                 </ul>
                 )}
             </div>
         )
     
 });

 export default SeedList


