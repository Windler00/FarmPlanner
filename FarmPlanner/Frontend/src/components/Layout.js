import { observer } from "mobx-react-lite";
import LeftBarStore from "../store/LeftBarStore";
import FieldList from "./FieldList/FieldList";
import Header from "./Header";

const Layout = observer((props) =>{

    return(
        <div className="layout">
            {LeftBarStore.isActive && (
                <FieldList/>
            )}
            <Header/>
            {props.children}
        </div>
    )
})

export default Layout;