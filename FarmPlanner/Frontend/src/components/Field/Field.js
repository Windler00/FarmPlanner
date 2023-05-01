import CustomButton from "../CustomButton/CustomButton";
import FieldStore from "../../store/FieldStore";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './Field.module.css'
import RowList from "../RowList/RowList";
import CustomInput from "../CustomInput/CustomInput";
import { observer } from 'mobx-react-lite';
import Modal from "../Modal/Modal";
import LeftBarStore from "../../store/LeftBarStore";

const Field = observer(() => {
    //input for create field
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

    async function handleFieldUpdate(id, name, description){
        await FieldStore.UpdateField(id, name, description)
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
                <CustomButton label={FieldStore.fieldById.name} onClick={() => setShowModal(true)}/>
                <Modal active={showModal} setActive={setShowModal}>
                        <CustomButton label="Удалить" onClick={() => {FieldStore.DeleteField(params.id); redirectToHome(); setShowModal(false)}}/>
                        <div className={styles.FieldName}>
                            <strong>
                                Имя: {FieldStore.fieldById.name}
                            </strong>
                        </div>
                        <CustomInput labelText="Имя" value={createFieldName} handleChange={ChangeCreateFieldName}></CustomInput>
                        <div className={styles.FieldDescription}>
                            <strong>
                                Описание: {FieldStore.fieldById.description}
                            </strong>
                        </div>
                        <CustomInput labelText="Описание" value={createFieldDescription} handleChange={ChangeCreateFieldDescription}></CustomInput>
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