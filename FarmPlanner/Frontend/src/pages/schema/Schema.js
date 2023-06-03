import { observer } from "mobx-react-lite";
import styles from "./Schema.module.css"
import { useEffect, useState } from "react";
import FieldStore from "../../store/FieldStore";
import { useLocation } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import RowStore from "../../store/RowStore";
import Modal from '../../components/Modal/Modal';
import { InputNumber } from "antd";
import SeedStore from "../../store/SeedStore";
import LeftBarStore from "../../store/LeftBarStore";


const Schema = observer(() =>{
    const [isActiveModal, setIsActiveModal] = useState(false);
    let location = useLocation()
    useEffect(() => {
        const fetchData = async () => {
          await FieldStore.fetchAll()
          await RowStore.fetchAll()
          await SeedStore.fetchAll()
        }
        fetchData()
      }, [location]);

      const Row = observer(() =>{
        let rowIds = [];
        for (var field of FieldStore.fieldList){
            if (!rowIds.includes(field.schemaRow)){
                rowIds.push(field.schemaRow)
            }
        }
    
        const HandleRowInfo = observer((props) => {
            let rowQuantity = 0;
            let seedQuantity = 0;
            RowStore.rowList.map((row) => {
                if (row.fieldId === props.field.id){
                    rowQuantity += 1
                    seedQuantity += row.quantity
                }
            })
            return(
                <>
                    <strong>Колличество рядов: {rowQuantity}</strong>
                    <strong>Колличество растений: {seedQuantity}</strong>
                </>
            )
        })
    
        function HandleFields(schemaRow){
            let result = []
            let sorted = FieldStore.fieldList.slice().sort((a, b) => a.schemaId - b.schemaId);
            sorted.map((field) => {
                if (field.schemaRow === schemaRow){
                    result.push(
                    <div key={field.id} className={styles.Field}>
                        <CustomButton key={field.id} label={field.name} onClick={() => {setFieldId(field.id);
                                                                                        setFieldName(field.name);
                                                                                        setFieldDescription(field.description);
                                                                                        setFieldLength(field.length);
                                                                                        setFieldWidth(field.width);
                                                                                        setSchemaRow(field.schemaRow);
                                                                                        setSchemaId(field.schemaId);
                                                                                        setIsActiveModal(true)}}/>
                        <HandleRowInfo field={field}/>
                    </div>
                    )
                }
            })
            return result
        }
    
        const HandleRows = observer(() =>{
            let elements = []
            let elementsWithoutId = []
            rowIds.map((id) => {
                if(id === 0){
                    const Fields = HandleFields(id)
                    elementsWithoutId.push(
                    <div key={id} className={styles.FirstRow}>
                        {Fields.map((field) =>
                            field
                        )}
                    </div>)
                }
                else{
                    const Fields = HandleFields(id)
                    elements.push(
                        <div key={id} className={styles.Row}>
                            <strong>Ряд грядок №{id}</strong>
                            {Fields.map((field) =>
                                field
                            )}
                        </div>
                    )
                }
            })
            return (
            <>
                {elementsWithoutId}
                {elements}
            </>)
        })
    
        return(
            <HandleRows/>
        )
    })

    const HandleFieldRows = observer(() => {
        const HandleSeeds = observer((props) => {
            let seeds = []
            let sorted =[]
            SeedStore.seedList.map((seed) => {
                if (seed.rowId === props.id){
                    sorted.push(seed)
                }}
            )
            sorted.map((sortedSeed, index) => {
                seeds.push(
                    <CustomButton key={index} label={index+1 + ") "+ sortedSeed.name}/>
                )
            })
            return(
                <>
                    {seeds}
                </>
            )
        })
        let rows = []
        RowStore.rowList.map((row,index) => {
            index = index + 1
            if (row.fieldId === fieldId){
                rows.push(
                    <div className={styles.RowItem}>
                        <CustomButton label={"Ряд № " + index +") " + row.name}/>
                        <HandleSeeds id={row.id}/>
                    </div>
                )
            }
        })
        return(
            <>
                {rows}
            </>
        )
    })

    const [fieldId, setFieldId] = useState(null)
    const [fieldName, setFieldName] = useState(null)
    const [fieldDescription, setFieldDescription] = useState(null)
    const [fieldLength, setFieldLength] = useState(null)
    const [fieldWidth, setFieldWidth] = useState(null)
    const [schemaRow, setSchemaRow] = useState(0)
    const [schemaId, setSchemaId] = useState(0)
    
    const marginIfActive = {
        marginLeft: LeftBarStore.isActive ? '350px' : '0px'
      };

    return(
        <div style={marginIfActive} className={styles.Schema}>
            <Row/>
            <Modal active={isActiveModal} setActive={setIsActiveModal}>
                <div className={styles.ModalField}>
                    <div className={styles.FieldInfo}>
                        <div className={styles.FieldInput}>
                            <strong>Ряд грядок</strong>
                            <InputNumber min={0} defaultValue={schemaRow} onChange={setSchemaRow}></InputNumber>
                        </div>
                        <div className={styles.FieldInput}>
                            <strong>Номер</strong>
                            <InputNumber min={0} defaultValue={schemaId} onChange={setSchemaId}></InputNumber>
                        </div>
                        <CustomButton label={"Изменить"} onClick={() => {FieldStore.UpdateField(fieldId,fieldName,fieldDescription,fieldLength,fieldWidth,schemaRow,schemaId); setIsActiveModal(false)}}/>
                    </div>
                    <div className={styles.Rows}>
                        <HandleFieldRows/>
                    </div>
                </div>
            </Modal>
        </div>
    )
})

export default Schema