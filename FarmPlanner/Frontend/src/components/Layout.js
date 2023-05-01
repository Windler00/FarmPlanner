import Header from "./Header";

export default function Layout(props){
    return(
        <div className="layout">
            <Header/>
            {props.children}
        </div>
    )
}