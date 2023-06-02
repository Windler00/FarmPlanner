import CustomLink from '../components/CustomLink/CustomLink';
import CustomButton from './CustomButton/CustomButton';
import LeftBarStore from '../store/LeftBarStore';
import { observer } from 'mobx-react-lite';
import { AutoComplete, Input, } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FieldStore from '../store/FieldStore';
import RowStore from '../store/RowStore';
import SeedStore from '../store/SeedStore';

const Header = observer(() => {
    let location = useLocation()
    useEffect(() => {
        const fetchData = async () => {
          await FieldStore.fetchAll()
          await RowStore.fetchAll()
          await SeedStore.fetchAll()
        }
        fetchData()
      }, [location]);

    function switchActiveLeftBar(){
        if(LeftBarStore.isActive === true) {
            LeftBarStore.setInactive();
        }
        else{
            LeftBarStore.setActive();
        }
    }

    let navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('')
    const [options, setOptions] = useState([]);


    const onSelect = (data) => {
        setSearchValue("")
        return navigate("/field/" + data)
      };
    const onChange = (data) => {
        setSearchValue(data);
    };
    const onSearch = (data) => {
        if (data === ""){
            setOptions(new Array)
        }
        else{
            setOptions(new Array)
            let result = []
            FieldStore.fieldList.map((field) => {
                let name =field.name.toUpperCase()
                let description = field.description.toUpperCase()
                if (name.includes(data.toUpperCase())){
                    result.push({label: "Имя грядки: " + field.name, value: field.id})
                    return
                }
                if (description.includes(data.toUpperCase())){
                    result.push({label: "Описание грядки: " + field.description, value: field.id})
                }
            })
            RowStore.rowList.map((row) => {
                let name = row.name.toUpperCase()
                let description = row.description.toUpperCase()
                if (name.includes(data.toUpperCase())){
                    result.push({label: "Имя ряда: " + row.name, value: row.fieldId})
                    return
                }
                 if (description.includes(data.toUpperCase())){
                    result.push({label: "Описание ряда: " + row.description, value: row.fieldId})
                }
            })
            setOptions(result)
        }
    }

    const marginIfActive = {
        marginLeft: LeftBarStore.isActive ? '350px' : '0px'
      };

    return (
        <>
            <div style={marginIfActive} className="header">
                {LeftBarStore.isActive ? (<></>) : (<CustomButton label="Грядки" onClick={() => LeftBarStore.setActive()}/>)}
                <CustomLink to="/" name="Схема"/>
                <CustomLink to="/categories" name="Растения"/>
                <div className='searchBar'>
                    <AutoComplete
                        style={{width: '40vw'}}
                        value={searchValue}
                        onSelect={onSelect}
                        options={options}
                        onSearch={(text) => {onSearch(text)}}
                        onChange={onChange}>
                        <Input size="large"/>
                    </AutoComplete>
                </div>
            </div>
        </>
    )
})

export default Header