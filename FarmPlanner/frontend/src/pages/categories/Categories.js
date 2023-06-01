import { observer } from "mobx-react-lite";
import CategoriesStore from "../../store/CategoriesStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import Modal from "../../components/Modal/Modal";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "./Categories.module.css"
import LeftBarStore from "../../store/LeftBarStore";



const Categories = observer((props) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [addCategoryInput, setAddCategoryInput] = useState("");
    const ChangeAddCategoryInput = event => {
        setAddCategoryInput(event.target.value)
    }

    const [createCategoryLevel, setCreateCategoryLevel] = useState(1);
    const [createCategoryParentId, setCreateCategoryParentId] = useState(0);
    function SetCategoryPost(level, parentId){
        setCreateCategoryLevel(level)
        setCreateCategoryParentId(parentId)
    }

    const location = useLocation()

    useEffect(() => {
        CategoriesStore.getLevel1()
        CategoriesStore.getLevel2()
        CategoriesStore.getLevel3()
    },[location]);

    function AddCategoryHandler(props){
        return(
            <div className={styles.createCategory}>
                <CustomButton label={"Создать растение"} onClick={() => {SetCategoryPost(props.level, props.parentId); setShowCreateModal(true)}}/>
            </div>
        )
    }

    function RemoveCategoryHandler(event){
        let id = event.target.id
        CategoriesStore.RemoveCategory(id)
    }

    const Level1Categories = observer((props) =>{
        return (
            <div className={styles.level1}>
                <ul>
                    {CategoriesStore.CategoriesLevel1.map((category, index) => (
                        <li className={styles.Level1} key={category.id}>
                            <div className={styles.Level1Category}>
                                <strong>{category.name}</strong>
                                <CustomButton id={category.id} label="Удалить" onClick={RemoveCategoryHandler}/>
                            </div>
                            <Level2Categories id={category.id} key={index}></Level2Categories>
                            <div className={styles.CreateParentButton}>
                                <AddCategoryHandler level={2} parentId={category.id} onClick={props.onClick}/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    })

    const Level2Categories = observer((props) =>{
        return(
            <ul>
                {CategoriesStore.CategoriesLevel2.map((category, index) => (
                    <div className={styles.level2}>
                        {category.parentId === props.id ?
                        (
                        <li className={styles.Level2} key={category.id}>
                            <div className={styles.Level2Category}>
                                <strong>{category.name}</strong>
                                <CustomButton id={category.id} label="Удалить" onClick={RemoveCategoryHandler}/>
                            </div>
                            <Level3Categories id={category.id} key={index} onClick={props.onClick}/>
                            <div className={styles.CreateParentButton}>
                                <AddCategoryHandler level={3} parentId={category.id}/>
                            </div>
                        </li>
                        )
                        :
                        (<>

                        </>)}
                    </div>
                ))}
            </ul>
        )
    })

    const Level3Categories = observer((props) => {
        return (
            <ul>
                {CategoriesStore.CategoriesLevel3.map((category) => (
                    <div className={styles.level3}>
                        {category.parentId === props.id ?
                        (<li className={styles.Level3} key={category.id}>
                            <div className={styles.Level3Category}>
                                <strong>{category.name}</strong>
                                <CustomButton id={category.id} label="Удалить" onClick={RemoveCategoryHandler}/>
                            </div>
                        </li>)
                        :
                        (<></>)
                        }
                    </div>
                ))}
            </ul>
        )
    })


    const marginIfActive = {
        marginLeft: LeftBarStore.isActive ? '350px' : '0px'
      };

    return(
    <div style={marginIfActive} className={styles.Categories}>
        {CategoriesStore.CategoriesLevel1.length === 0 ? (
            <div>
                <div className={styles.CreateParentButton}>
                    <AddCategoryHandler level={1} parentId={0}/>
                </div>
                <Modal active={showCreateModal} setActive={setShowCreateModal}>
                    <CustomInput labelText="Имя растения" value={addCategoryInput} handleChange={ChangeAddCategoryInput}/>
                    <CustomButton label="Создать" onClick={async () => {await CategoriesStore.PostCategory(createCategoryLevel, addCategoryInput, createCategoryParentId); setAddCategoryInput(""); setShowCreateModal(false)}}/>
                </Modal>
            </div>
        )
        :
        (
        <div>
            <Level1Categories onClick={props.onClick}/>
            <Modal active={showCreateModal} setActive={setShowCreateModal}>
                <CustomInput labelText="Имя растения" value={addCategoryInput} handleChange={ChangeAddCategoryInput}/>
                <CustomButton label="Создать" onClick={() => {CategoriesStore.PostCategory(createCategoryLevel, addCategoryInput, createCategoryParentId); setAddCategoryInput(""); setShowCreateModal(false)}}/>
            </Modal>
            <div className={styles.CreateParentButton}>
                <AddCategoryHandler level={1} parentId={0}/>
            </div>
        </div>
        )
        }
    </div>
    )
})

export default Categories