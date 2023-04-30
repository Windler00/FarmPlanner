import Header from "./Header";
import FieldList from "./FieldList/FieldList";

export default function Layout(props){
    return(
        <div className="layout">
            <FieldList/>
            <Header/>
            {props.children}
        </div>
    )
}