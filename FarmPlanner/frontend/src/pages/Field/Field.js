import CustomButton from "../../components/CustomButton/CustomButton";
import FieldStore from "../../store/FieldStore";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './Field.module.css'
import RowList from "../../components/RowList/RowList";
import CustomInput from "../../components/CustomInput/CustomInput";
import { observer } from 'mobx-react-lite';
import Modal from "../../components/Modal/Modal";
import LeftBarStore from "../../store/LeftBarStore";
import { InputNumber } from 'antd';

const Field = observer(() => {
  const [createFieldName, setCreateFieldName] = useState("");
  function ChangeCreateFieldName(event){
    setCreateFieldName(event.target.value);
  }

  const [createFieldDescription, setCreateFieldDescription] = useState("");
  function ChangeCreateFieldDescription(event){
    setCreateFieldDescription(event.target.value);
  }

  const [showModal, setShowModal] = useState(false);

    let params = useParams();
    let location = useLocation();
    let navigate = useNavigate();
    
    useEffect(() => {
        FieldStore.fetchById(params.id);
    },[location]);

    function redirectToHome(){
        return navigate("/")
    }


    const [inputLength, setInputLength] = useState(1);
    const [inputWidth, setInputWidth] = useState(1);


    async function handleFieldUpdate(id, name, description){
        await FieldStore.UpdateField(id, name, description, inputLength, inputWidth, FieldStore.fieldById.schemaRow, FieldStore.fieldById.schemaId)
        await FieldStore.fetchById(params.id);
        setShowModal(false)
    }

    const marginIfActive = {
        marginLeft: LeftBarStore.isActive ? '350px' : '0px'
      };

    return(
        <div style={marginIfActive} className={styles.Field}>
            <div className={styles.FieldItem}>
            {FieldStore.fieldById == null ? (
                <></>
            )
            :
            (
            <>
                <div className={styles.FieldInfo}>
                    <strong>Имя грядки: </strong>
                    <CustomButton label={FieldStore.fieldById.name} onClick={() => {setCreateFieldName(FieldStore.fieldById.name);
                                                                                                    setCreateFieldDescription(FieldStore.fieldById.description);
                                                                                                    setInputLength(FieldStore.fieldById.length);
                                                                                                    setInputWidth(FieldStore.fieldById.width);
                                                                                                    setShowModal(true)}}/>
                    <strong>Описание: {FieldStore.fieldById.description}</strong>
                    <strong>Длинна грядки(см): {FieldStore.fieldById.length}</strong>
                    <strong>Ширина грядки(см): {FieldStore.fieldById.width}</strong>
                </div>
                
                <Modal active={showModal} setActive={setShowModal}>
                        <CustomButton label="Удалить" onClick={() => {FieldStore.DeleteField(params.id); redirectToHome(); setShowModal(false)}}/>
                        <CustomInput labelText="Имя" value={createFieldName} handleChange={ChangeCreateFieldName}></CustomInput>
                        <CustomInput labelText="Описание" value={createFieldDescription} handleChange={ChangeCreateFieldDescription}></CustomInput>
                        <div>
                            <strong>Длинна(см): {FieldStore.fieldById.height}</strong>
                            <InputNumber min={1} defaultValue={FieldStore.fieldById.length} onChange={setInputLength}/>
                        </div>
                        <div>
                            <strong>Ширина(см): {FieldStore.fieldById.width}</strong>
                            <InputNumber min={1} defaultValue={FieldStore.fieldById.width} onChange={setInputWidth}/>
                        </div>
                        <CustomButton label="Изменить" onClick={() => {handleFieldUpdate(FieldStore.fieldById.id, createFieldName, createFieldDescription)}}/>
                </Modal>
            </>
            )}
            <RowList fieldId={params.id}/>
            </div>
        </div>
    )
})

export default Field