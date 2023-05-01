import CustomLink from '../components/CustomLink/CustomLink';
import CustomButton from './CustomButton/CustomButton';
import FieldList from './FieldList/FieldList';
import LeftBarStore from '../store/LeftBarStore';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
    function switchActiveLeftBar(){
        if(LeftBarStore.isActive === true) {
            LeftBarStore.setInactive();
        }
        else{
            LeftBarStore.setActive();
        }
    }

    return (
        <>
            <div className="header">
                <CustomButton label="+" onClick={() => switchActiveLeftBar()}/>
                <h1><CustomLink to="/" name={"Home"}/></h1>
            </div>
            {LeftBarStore.isActive && (
                <FieldList/>
            )}
        </>
    )
})

export default Header